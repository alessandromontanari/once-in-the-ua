use serde::Deserialize;
use std::fs;
use std::path::Path;
use regex::Regex;

#[derive(Debug, Deserialize)]
struct Reference {
    id: String,
    title: String,
    author: String,
    year: u32,
    page: u32,
    publisher: String,
}

#[derive(Debug, Deserialize)]
struct Citation {
    id: String,
    text: String,
    author: String,
    context: String,
    timestamp: String,
    reference: Reference,
}

#[derive(Debug, Deserialize)]
struct CitationsData {
    citations: Vec<Citation>,
    events: Vec<Citation>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let repo_root = Path::new("../");
    let citations_path = repo_root.join("data/citations.json");
    let index_path = repo_root.join("index.html");
    let backup_path = repo_root.join("index.html.bak");

    // Create backup
    if index_path.exists() {
        fs::copy(&index_path, &backup_path)?;
        println!("Backup created: index.html.bak");
    }

    // Read files
    let citations_json = fs::read_to_string(&citations_path)?;
    let template = fs::read_to_string(&index_path)?;

    // Parse JSON
    let data: CitationsData = serde_json::from_str(&citations_json)?;

    // Process template
    let processed_html = process_template(&template, &data)?;

    // Write output
    fs::write(&index_path, processed_html)?;

    println!("Generated: index.html");
    Ok(())
}

fn process_template(template: &str, data: &CitationsData) -> Result<String, Box<dyn std::error::Error>> {
    let mut html = template.to_string();

    // Step 1: Replace <p data-citation="ID"></p> with full citation content
    let re = Regex::new(r#"<p\s+data-citation="([^"]+)"\s*></p>"#)?;
    html = re.replace_all(&html, |caps: &regex::Captures| {
        let citation_id = caps.get(1).unwrap().as_str();
        generate_citation_html(citation_id, data)
    }).to_string();

    // Step 2: Replace [1], [2] markers
    let description_re = Regex::new(r##"(?s)<div class="description">(.*?)</div>"##)?;
    html = description_re.replace_all(&html, |caps: &regex::Captures| {
        let content = caps.get(1).unwrap().as_str();
        let processed = replace_citation_markers(content, data);
        format!("<div class=\"description\">{}</div>", processed)
    }).to_string();

    // Step 3: Generate references
    let references_html = generate_references(data);
    let references_re = Regex::new(r##"(?s)<div id="references">.*?</div>"##)?;
    html = references_re.replace(&html, |_caps: &regex::Captures| {
        format!("<div id=\"references\">\n            <h3>References:</h3>\n            <ul>{}</ul>\n        </div>", references_html)
    }).to_string();

    // Step 4: Remove citations.js
    let script_re = Regex::new(r##"<script src="js/citations\.js"></script>"##)?;
    html = script_re.replace_all(&html, "").to_string();

    Ok(html)
}

fn generate_citation_html(citation_id: &str, data: &CitationsData) -> String {
    let citation = data.citations.iter().find(|c| c.id == citation_id)
        .or_else(|| data.events.iter().find(|c| c.id == citation_id));

    if let Some(citation) = citation {
        let index = data.citations.iter().position(|c| c.id == citation_id)
            .map(|i| i + 1)
            .or_else(|| {
                data.events.iter().position(|c| c.id == citation_id)
                    .map(|i| i + 1 + data.citations.len())
            })
            .unwrap_or(1);

        format!(
            "<p>\"{} - {}, <br>\n    {} <sup class=\"citation\" data-citation-id=\"{}\" title=\"{} - {}\">{}</sup>.</p>",
            citation.text, citation.author, citation.context,
            citation.id, citation.text, citation.author, index
        )
    } else {
        format!("<p>[Citation not found: {}]</p>", citation_id)
    }
}

fn replace_citation_markers(text: &str, data: &CitationsData) -> String {
    let re = Regex::new(r"\[(\d+)\]").unwrap();
    re.replace_all(text, |caps: &regex::Captures| {
        let index: usize = caps.get(1).unwrap().as_str().parse().unwrap_or(0);
        if index == 0 || index > data.citations.len() {
            return caps.get(0).unwrap().as_str().to_string();
        }
        let citation = &data.citations[index - 1];
        format!(
            "<sup class=\"citation\" data-citation-id=\"{}\" title=\"{} - {}\">{}</sup>",
            citation.id, citation.text, citation.author, index
        )
    }).to_string()
}

fn generate_references(data: &CitationsData) -> String {
    let mut references = Vec::new();
    let mut seen_refs = std::collections::HashSet::new();

    for (index, citation) in data.citations.iter().enumerate() {
        let ref_id = &citation.reference.id;
        if !seen_refs.contains(ref_id) {
            seen_refs.insert(ref_id);
            references.push((index + 1, &citation.reference));
        }
    }

    for (index, event) in data.events.iter().enumerate() {
        let ref_id = &event.reference.id;
        if !seen_refs.contains(ref_id) {
            seen_refs.insert(ref_id);
            references.push((index + 1 + data.citations.len(), &event.reference));
        }
    }

    references.iter().map(|(idx, ref_data)| {
        format!(
            "<li>[{}] {}, <em>{}</em>, {}, p. {}.</li>",
            idx, ref_data.author, ref_data.title, ref_data.year, ref_data.page
        )
    }).collect::<Vec<_>>().join("\n    ")
}