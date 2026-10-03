# BIS Intelligent Assistant

> AI-powered conversational assistant for Indian Standards, BIS certification, testing laboratories, hallmarking, and consumer guidance.

## Smart India Hackathon 2026

- **Problem Statement:** SIH26107
- **Theme:** Smart Automation
- **Team:** CODERS VIBE
- **Project:** BIS Intelligent Assistant

---

## 📌 Overview

The **BIS Intelligent Assistant** is an AI-powered web application designed to help users interact naturally with information related to the **Bureau of Indian Standards (BIS)**.

The system allows users to ask questions in natural language and receive context-aware, source-backed responses based on an authorized BIS knowledge base.

Instead of relying only on general-purpose AI knowledge, the application uses a **Retrieval-Augmented Generation (RAG)** architecture to retrieve relevant BIS documents and information before generating an answer.

The primary goal is to make BIS information easier to discover, understand, and use while reducing the risk of unsupported or fabricated information.

---

## 🎯 Problem Statement

BIS-related information can be distributed across standards, certification procedures, testing information, hallmarking resources, consumer information, and other technical documents.

Users may find it difficult to:

- Identify the correct Indian Standard for a product.
- Understand BIS certification procedures.
- Find applicable testing requirements.
- Locate relevant testing laboratories.
- Understand hallmarking-related information.
- Find reliable information from BIS documents.
- Ask follow-up questions while maintaining conversation context.
- Understand technical information through natural-language interaction.

The BIS Intelligent Assistant addresses these challenges through a centralized conversational interface backed by a searchable knowledge base.

---

## 💡 Proposed Solution

The application follows a simple workflow:

**Ask → Understand → Retrieve → Answer → Cite**

1. The user asks a question in natural language.
2. The system analyzes the user's intent.
3. Relevant information is retrieved from the BIS knowledge base.
4. The retrieved context is provided to the language model.
5. The system generates an answer grounded in the retrieved information.
6. Relevant source information is displayed with the answer.

This architecture helps ensure that the assistant does not simply generate answers from general model knowledge.

---

## 🚀 Key Features

### 1. Ask BIS

Users can ask questions related to:

- Indian Standards
- Products and applicable standards
- BIS certification
- Licensing procedures
- Testing requirements
- Testing laboratories
- Hallmarking
- Consumer information
- BIS-related procedures
- General BIS services

The assistant supports conversational follow-up questions and maintains relevant conversation context.

---

### 2. Standards Discovery

Users can search for standards using natural-language queries.

Example:

> What standard applies to this product?

The system retrieves relevant standards from the indexed BIS knowledge base.

Standards recommendations should be based on the indexed knowledge base rather than unsupported general LLM knowledge.

---

### 3. Certification Guidance

The system provides information related to BIS certification and licensing procedures based on available knowledge-base sources.

Users can ask questions such as:

- How does BIS certification work?
- What is the certification process?
- What documents are required?
- What testing requirements apply?
- What steps are involved in obtaining certification?

Answers are grounded in retrieved source information.

---

### 4. Testing Laboratory Information

The assistant can retrieve relevant testing information from the knowledge base.

Users can ask about:

- Testing requirements
- Applicable testing information
- Laboratory-related information
- Testing procedures
- Documents mentioning testing laboratories

---

### 5. Hallmarking Information

The application provides a dedicated area for hallmarking-related information.

Users can ask questions related to:

- Hallmarking
- Precious metal standards
- Hallmarking procedures
- Consumer information related to hallmarking

The assistant uses indexed knowledge rather than inventing unsupported facts.

---

### 6. Consumer Help

The Consumer Help section provides a simplified interface for users looking for BIS-related consumer information.

The goal is to make technical or procedural information easier to understand.

---

### 7. Source-Backed Answers

Whenever possible, answers should provide supporting source information such as:

- Document name
- File name
- Standard number
- Page number
- Section
- Category

## - url

- Relevance score
- Retrieved text snippet

This allows users to verify the information provided by the assistant.

---

### 8. Conversational Follow-Ups

The assistant supports follow-up questions.
9. Multilingual Architecture
The architecture is designed to support multiple Indian languages.
The initial implementation supports:
English
The architecture is prepared for future support for:
Hindi
Telugu
Urdu
The application should not claim full multilingual support unless that language has actually been implemented and tested.
🧠 RAG Architecture
The core of the BIS Intelligent Assistant is a Retrieval-Augmented Generation (RAG) pipeline.
RAG Workflow
BIS Documents
↓
PDF Extraction
↓
Text Cleaning
↓
Chunking
↓
Metadata Generation
↓
Embeddings
↓
Qdrant Vector Database
↓
Semantic Retrieval
↓
Relevant Context
↓

## Llm

↓
Source-Backed Answer
The retrieval layer is responsible for finding relevant information before the language model generates the final response.
🏗️ System Architecture
┌──────────────────────┐
│      User / UI       │
└──────────┬───────────┘
│
▼
┌──────────────────────┐
│   Next.js Frontend   │
│ React + TypeScript   │
│      Tailwind CSS    │
└──────────┬───────────┘
│
▼
┌──────────────────────┐
│    FastAPI Backend   │
└──────────┬───────────┘
│
┌─────────────┴─────────────┐
│                           │
▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│ Retrieval / RAG  │        │   BIS Services   │
└────────┬─────────┘        └──────────────────┘
│
▼
┌──────────────────┐
│ Qdrant Vector DB │
└────────┬─────────┘
│
▼
┌──────────────────┐
│ Retrieved Chunks │
└────────┬─────────┘
│
▼
┌──────────────────┐

## │      llm         │

│  Groq / Ollama   │
└────────┬─────────┘
│
▼
┌──────────────────┐
│ Answer + Sources  │
└──────────────────┘
🛠️ Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Python
FastAPI

## Ai / llm

Groq LLM
Optional Ollama local fallback
Retrieval
Sentence Transformers
Qdrant
Document Processing
PyMuPDF

## Ocr

Testing
pytest
npm build / production build validation
📁 Project Structure
The project follows a separation between frontend, backend, knowledge documents, and application components.
BIS-Intelligent-Assistant/
│
├── frontend/
│
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── lib/
│   ├── package.json
│   └── ...
│
├── backend/
│
│   ├── app/
│   │   ├── api/
│   │   ├── ingestion/
│   │   ├── rag/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── data/
│   │   └── documents/
│   │       ├── standards/
│   │       ├── certification/
│   │       ├── testing/
│   │       ├── hallmarking/
│   │       └── consumer/
│   │
│   ├── tests/
│   ├── requirements.txt
│   └── ...
│
├── .env.example
├── README.md
└── ...
📚 Knowledge Base
The knowledge base is organized into major BIS information categories.
backend/data/documents/
│
├── standards/
├── certification/
├── testing/
├── hallmarking/
└── consumer/
Documents placed in these directories can be processed through the ingestion pipeline.
The knowledge base should contain authorized and appropriate BIS source material.
📄 Document Ingestion Pipeline
The ingestion process converts BIS documents into searchable vector representations.
Pipeline

## Pdf

↓
Text Extraction
↓
OCR if required
↓
Cleaning
↓
Chunking
↓
Metadata
↓
Embeddings
↓
Qdrant
The suggested chunking configuration is:
Chunk Size: 800
Overlap: 100
The exact configuration can be adjusted during implementation and testing.
🔎 Metadata
Each indexed chunk should retain useful metadata.
Example metadata:
document_name
file_name
standard_number
page
section
category
url
snippet
relevance_score
Metadata allows the application to display source information alongside answers.
🗄️ Qdrant Vector Database
The project uses Qdrant as the vector database.
The main collection is:
bis_documents
The collection should persist between application restarts.
The system should be able to report information such as:
Collection name
Vector count
Embedding model
Document count
🔄 Ingestion Command
The backend ingestion process can be executed using:
python -m app.ingestion.ingest
The ingestion process should generate useful reporting information including:
Processed documents
Processed pages
Generated chunks
Generated vectors
Errors
🔌 Backend API
The backend exposes the following primary API endpoints.
Health Check
GET /api/health
Used to check whether the backend service is running.
Chat
POST /api/chat
Example request:
{
"message": "What standard applies to this product?",
"conversation_id": "optional-id",
"language": "en",
"context": {}
}
Example response structure:
{
"answer": "Source-backed answer",
"sources": [],
"suggested_followups": [],
"conversation_id": "conversation-id"
}
Search
POST /api/search
Used to retrieve relevant knowledge-base information.
Standards Recommendation
POST /api/standards/recommend
Used to identify relevant standards from the indexed BIS knowledge base.
Knowledge Base Status
GET /api/knowledge/status
Used to retrieve knowledge-base status information.
Ingestion Status
POST /api/ingestion/status
Used to retrieve information about ingestion operations.
🔐 Security
Security is an important part of the application.
The project should follow these principles:
Store API keys in environment variables.
Never expose API keys in frontend code.
Never commit secrets to Git.
Provide a .env.example file.
Validate API input.
Configure CORS appropriately.
Implement structured error handling.
Keep the application rate-limit ready.
Never expose sensitive backend information to users.
The Groq API key must never be exposed through the frontend.
⚠️ Reliability and Grounding
The BIS Intelligent Assistant should prioritize factual grounding over unrestricted AI generation.
The system should not fabricate:
Indian Standards
Standard numbers
Clauses
Certification requirements
Testing requirements
Laboratory names
Laboratory contact information
Fees
Timelines
Legal requirements
BIS procedures
If relevant information is not available in the knowledge base, the system should clearly communicate that it does not have sufficient verified information.
🚨 Error Handling
The application should gracefully handle situations such as:
Backend unavailable
Missing API key
Empty user message
No relevant information found
Vector database unavailable
LLM unavailable
Ingestion failure
Network errors
Request timeout
Users should receive a meaningful error message rather than a backend stack trace.
🎨 User Interface
The application includes the following primary navigation areas:
Home
Standards
Certification
Testing Labs
Hallmarking
Consumer Help
Ask BIS / Chat
A language selector should also be available where supported.
💬 Ask BIS Chat Experience
The Ask BIS interface should provide:
Natural-language question input
Conversation history
Follow-up questions
Suggested starter questions
Language selection
Source references
Relevant document information
Retry functionality
Clear error messages
Accessible controls
Responsive layout
The interface should make the source of the answer understandable to the user.
♿ Accessibility
The application should follow accessible UI practices including:
Keyboard navigation
Proper labels
Accessible buttons
Sufficient contrast
Responsive design
Screen-reader-friendly controls
Visible focus states
Clear interaction states
📱 Responsive Design
The application should work across:
Desktop
Laptop
Tablet
Mobile
The interface should maintain usability across different screen sizes.
🧪 Testing
The project should be tested at multiple levels.
Backend Tests
Use:
pytest
Tests should cover:
PDF extraction
Text cleaning
Chunking
Embedding generation
Qdrant integration
Retrieval
RAG pipeline
Source metadata
API validation
Chat endpoint
Standards recommendation
Error handling
Frontend Tests / Validation
The frontend should be checked for:
TypeScript errors
Component errors
API integration
Responsive behavior
Accessibility
Chat functionality
Source rendering
Production build
Production build should be executed using the appropriate npm build command.
Example:
npm run build
✅ Acceptance Criteria
The project should satisfy the following conditions:
Application
The website starts successfully.
Frontend loads correctly.
Backend starts successfully.
Frontend and backend communicate correctly.
Ask BIS
User can enter a question.
Question reaches the FastAPI backend.
Backend performs retrieval.
Qdrant returns relevant chunks.
LLM receives retrieved context.
Answer is generated from retrieved information.
Sources are returned.
Sources are displayed in the UI.
Suggested follow-ups are available.
Standards
Users can request standards recommendations.
Recommendations come from the indexed BIS knowledge base.
Unsupported standards are not fabricated.
Reliability
No fabricated BIS information.
Missing information is handled transparently.
Backend errors are handled gracefully.
LLM failures do not crash the entire application.
Production Readiness
Environment variables are used.
Secrets are not committed.
API keys are not exposed.
Frontend production build succeeds.
Backend tests pass.
Core functionality is actually tested rather than assumed complete.
🧪 Example Queries
Users can ask questions such as:
What is BIS certification?

Which Indian Standard applies to this product?

How can I apply for BIS certification?

What are the testing requirements?

What documents are required for certification?

Where can I find information about testing laboratories?

What is hallmarking?

Can you explain this BIS requirement in simple language?

Can you show the source for this answer?

What standard was mentioned in the previous answer?
The exact answer depends on the information available in the indexed knowledge base.
🧩 Demo Knowledge Base
If the project is demonstrated using sample or non-official content, it must be clearly labeled:
Demo Knowledge Base
Demo content must not be presented as official BIS information.
The application should clearly distinguish between:
Official/source-backed knowledge
Demo knowledge
Unsupported information
🔬 Research and Future Improvements
Potential future improvements include:
Expanded multilingual support
Improved OCR
Better document parsing
More advanced semantic retrieval
Improved source ranking
Hybrid retrieval
Improved conversational memory
Additional BIS document categories
Better query intent detection
Advanced evaluation datasets
Retrieval accuracy evaluation
Answer faithfulness evaluation
Improved source citation UI
Local LLM support through Ollama
These improvements should only be implemented where they remain consistent with the core project architecture.
🗺️ Development Roadmap
Phase 1 — Foundation
Set up frontend
Set up backend
Configure project structure
Configure environment variables
Implement basic API communication
Create initial UI
Phase 2 — Knowledge Base + RAG
Collect authorized documents
Implement PDF extraction
Implement OCR where required
Clean documents
Implement chunking
Generate embeddings
Configure Qdrant
Implement semantic retrieval
Implement source metadata
Phase 3 — BIS Features
Ask BIS
Standards recommendation
Certification guidance
Testing information
Hallmarking
Consumer Help
Phase 4 — Production UX
Responsive UI
Accessibility
Error states
Source display
Follow-up suggestions
Multilingual architecture
Improved navigation
Phase 5 — Testing and Demo
Backend testing
Retrieval testing
RAG evaluation
API testing
Frontend validation
Production build
Demo preparation
End-to-end testing
🔄 End-to-End Request Flow
A typical user request follows this process:
User enters question
↓
Frontend captures question
↓
POST /api/chat
↓
FastAPI receives request
↓
Question processing
↓
Semantic retrieval
↓
Qdrant search
↓
Relevant BIS chunks
↓
Context construction
↓
LLM generation
↓
Source mapping
↓
Answer + sources + follow-ups
↓
Frontend displays response
🎯 Project Goal
The primary goal of the BIS Intelligent Assistant is to create a reliable, accessible, and intelligent interface for interacting with BIS-related information.
The system combines:
Natural-language interaction
Retrieval-Augmented Generation
Semantic search
Vector databases
Source-backed responses
Conversational context
Structured BIS knowledge
Accessible web design
The focus is not simply on generating AI responses, but on providing useful answers grounded in available BIS source information.
🏆 Smart India Hackathon Context
This project is designed for:
Smart India Hackathon 2026
Problem Statement : SIH26107
Theme             : Smart Automation
Team              : CODERS VIBE
Project           : BIS Intelligent Assistant
The solution aims to demonstrate how AI, semantic retrieval, document processing, and conversational interfaces can be combined to improve access to standards and BIS-related information.
📌 Important Principle
The BIS Intelligent Assistant should follow one core principle:
If the knowledge base does not support the answer, the system should not invent it.
Every implementation decision should prioritize:
Accuracy
↓
Grounding
↓
Source Traceability
↓
Reliability
↓
User Experience
📄 License
This project is developed as part of the Smart India Hackathon 2026 project by team CODERS VIBE.
Project-specific licensing and distribution terms can be added here when finalized.
