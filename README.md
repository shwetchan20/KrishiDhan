# 🌾 KrishiDhan
## Voice-Enabled AI Farming Consultant

### Live Demo
https://krishi-dhan.vercel.app

---

# Overview

KrishiDhan is a voice-first AI farming assistant designed to help small and marginal farmers receive practical agricultural guidance using natural conversation.

The prototype was developed as a proof of concept for a real-world AI assistant capable of understanding farmer queries, combining multiple data sources, and generating contextual recommendations.

Unlike a general chatbot, the assistant attempts to answer using:

- Farmer's current location
- Live weather conditions
- Disease risk estimation
- Crop knowledge database
- Market information
- Government schemes

The primary objective was to explore how AI can reduce the information gap faced by farmers while keeping the interaction as simple as speaking into a phone.

---

# Problem

Many farmers depend on multiple disconnected sources for agricultural decisions.

Typical questions include:

- Which crop should I grow?
- Is today's weather suitable?
- How do I cultivate soybean?
- Which government schemes am I eligible for?
- Should I sell my produce now?

Finding reliable answers often requires consulting experts, multiple websites, or government offices.

KrishiDhan attempts to bring these services together into a single conversational interface.

---

# Approach

Instead of relying only on a Large Language Model, the prototype follows a Retrieval-Augmented approach.

User Query
↓

Speech Recognition

↓

Current Location Detection

↓

Weather API

↓

Crop Database

↓

Market Dataset

↓

Government Schemes

↓

Structured Prompt Construction

↓

Groq Llama 3.3

↓

Voice Response

The LLM receives structured agricultural context instead of answering only from its own knowledge.

This reduces hallucination and produces recommendations that are more relevant to the farmer's current situation.

---

# Core Features

## 🎤 Voice-first Interaction

- Speech-to-text input
- Text-to-speech output
- Hands-free consultation

---

## 🌦 Context-aware Recommendations

Uses:

- GPS location
- Weather
- Humidity
- Rainfall
- Disease risk

to personalize recommendations.

---

## 🌱 Crop Advisory

Provides guidance on:

- Suitable crops
- Cultivation practices
- Irrigation
- Fertilizer
- Disease prevention
- Pest management

---

## 📈 Market Information

Displays:

- Market
- Crop price
- Trend
- Recommendation

using a prototype market dataset.

---

## 🏛 Government Scheme Assistant

Suggests relevant farmer schemes including:

- PM Kisan
- MahaDBT
- Namo Shetkari
- PoCRA

---

## 📍 Automatic Location Detection

Uses browser geolocation and reverse geocoding to identify the farmer's village, district and state.

---

# Technical Architecture

Frontend

- React
- Vite
- Tailwind CSS

AI

- Groq API
- Llama 3.3 70B Versatile

Speech

- Web Speech API
- Browser Speech Synthesis

Weather

- Open-Meteo API

Location

- Browser Geolocation
- OpenStreetMap Reverse Geocoding

Deployment

- Vercel

---

# Prompt Engineering

The assistant is instructed to behave as an experienced Agriculture Extension Officer.

Instead of asking the model to answer freely, a structured prompt is generated using:

- Farmer question
- Weather
- Location
- Crop dataset
- Market dataset
- Government schemes

Additional prompt constraints were added to:

- avoid markdown
- produce voice-friendly responses
- keep answers concise
- reduce hallucination
- generate practical recommendations

---

# Design Decisions

This prototype intentionally uses structured local datasets instead of external agricultural APIs.

Reasons:

- deterministic behaviour
- faster response
- easier evaluation
- offline extensibility
- simpler prototype deployment

The architecture allows these datasets to be replaced later with live government or APMC APIs.

---

# Current Limitations

This prototype is intended as a proof of concept.

Current limitations include:

- Prototype market dataset
- Limited crop database
- English-only interaction
- AI responses depend on prompt quality
- No persistent farmer history

---

# Future Scope

Possible extensions include:

- Live APMC integration
- Image-based disease detection
- Multilingual speech support
- Personalized farmer profiles
- Crop calendar
- Yield prediction
- Soil health recommendations
- WhatsApp integration
- Offline mode

---

# Repository

https://github.com/shwetchan20/KrishiDhan

---

# Author

Developed by **Shwet** as an AI-powered agricultural assistance prototype.
