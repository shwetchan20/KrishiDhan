import React, { useState } from "react";
import {
    Mic,
    Volume2,
    Loader,
    Cloud,
    TrendingUp,
    Sprout,
    Square
} from "lucide-react";

import MobileLayout from "../components/MobileLayout";

import { askAI } from "../services/aiService";
import {
    startListening,
    stopListening,
    speak,
    stopSpeaking,
} from "../services/speechService";

import { getWeatherByCoords } from "../services/weatherService";
import { getMarketPrice } from "../services/marketService";

import schemes from "../data/schemesData";
import crops from "../data/cropsData";

export default function VoiceConsultant({ t }) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const [weather, setWeather] = useState(null);
    const [market, setMarket] = useState(null);
    const [location, setLocation] = useState("");

    const [listening, setListening] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    //---------------------------------------

    async function detectLocation() {

        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(

                async (pos) => {

                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;

                    const weatherData = await getWeatherByCoords(lat, lon);

                    setWeather(weatherData);

                    setLocation(weatherData.fullLocation);

                    resolve(weatherData);

                },

                reject

            );

        });

    }

    //---------------------------------------

    async function handleVoice() {

        try {

            setListening(true);

            const text = await startListening("en-IN");

            setQuestion(text);

        } catch (err) {

            alert(err.message);

        } finally {

            setListening(false);

        }

    }

    //---------------------------------------

    async function askAssistant() {

        if (!question.trim()) return;

        setLoading(true);

        try {

            let weatherData = weather;

            if (!weatherData) {

                weatherData = await detectLocation();

            }

            const lowerQuestion = question.toLowerCase();

            const cropFound =
                crops.find(c =>
                    lowerQuestion.includes(c.name.toLowerCase())
                ) ||
                crops.find(c =>
                    c.aliases?.some(alias =>
                        lowerQuestion.includes(alias.toLowerCase())
                    )
                ) ||
                crops[0];
            // Get market based on detected state
            const marketData = getMarketPrice(
                cropFound.name,
                weatherData.state
            );

            setMarket(marketData);

            console.log("QUESTION:", question);
            console.log("LOCATION:", weatherData.fullLocation);
            console.log("STATE:", weatherData.state);
            console.log("CROPS:", crops);
            console.log("SCHEMES:", schemes);
            console.log("MARKET:", marketData);

            const response = await askAI({

                question,

                weather: weatherData,

                market: marketData,

                crops,

                schemes,

                location: weatherData.fullLocation,
                state: weatherData.state

            });

            setAnswer(response);

            setSpeaking(true);

            speak(response);

            setTimeout(() => {

                setSpeaking(false);

            }, 1000);

        }

        catch (err) {

            console.error(err);

            alert(err.message);

        }

        setLoading(false);

    }

    //---------------------------------------

    function stopEverything() {

        stopListening();

        stopSpeaking();

        setListening(false);

        setSpeaking(false);

    }

    //---------------------------------------

    return (

        <MobileLayout t={t}>

            <div className="space-y-5 pb-20">

                <div>

                    <h1 className="text-2xl font-black text-green-700">
                        🌾 Krishi AI Advisor
                    </h1>

                    <p className="text-sm text-gray-500">
                        Voice-first Farming Assistant
                    </p>

                </div>

                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything about crops, weather, planting or schemes..."
                    className="w-full rounded-xl border p-4 h-36"
                />

                <div className="flex gap-3">

                    <button
                        onClick={handleVoice}
                        className="flex-1 bg-green-600 text-white rounded-xl py-3 font-bold flex justify-center items-center gap-2"
                    >

                        <Mic size={18} />

                        {listening ? "Listening..." : "Voice"}

                    </button>

                    <button
                        onClick={askAssistant}
                        className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-bold"
                    >

                        Ask AI

                    </button>

                </div>

                {(listening || speaking) && (

                    <button
                        onClick={stopEverything}
                        className="w-full bg-red-600 text-white rounded-xl py-3 font-bold flex justify-center items-center gap-2"
                    >

                        <Square size={16} />

                        Stop

                    </button>

                )}

                {loading && (

                    <div className="bg-white rounded-xl p-5 shadow">

                        <Loader className="animate-spin" />

                    </div>

                )}

                {weather && (

                    <div className="bg-white rounded-2xl shadow p-5">

                        <div className="flex items-center gap-2 mb-3">

                            <Cloud size={20} />

                            <h3 className="font-bold">Weather</h3>

                        </div>
                        <p><b>Location :</b> {location}</p>

                        <p>Temperature : {weather.temperature}°C</p>

                        <p>Humidity : {weather.humidity}%</p>

                        <p>Rainfall : {weather.rainfall} mm</p>

                        <p>Disease Risk : <b>{weather.diseaseRisk}</b></p>

                    </div>

                )}

                {market && (

                    <div className="bg-white rounded-2xl shadow p-5">

                        <div className="flex items-center gap-2 mb-3">

                            <TrendingUp size={20} />

                            <h3 className="font-bold">Market Intelligence</h3>

                        </div>

                        <p>Crop : {market.crop}</p>

                        <p>Market : {market.market}</p>

                        <p>Price : {market.price} {market.unit}</p>

                        <p>Trend : {market.trend}</p>

                    </div>

                )}

                {answer && (

                    <div className="bg-white rounded-2xl shadow p-5">

                        <div className="flex items-center gap-2 mb-3">

                            <Sprout size={20} />

                            <h3 className="font-bold">AI Recommendation</h3>

                        </div>

                        <p className="whitespace-pre-wrap">

                            {answer}

                        </p>

                        <button
                            onClick={() => speak(answer)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >

                            <Volume2 size={16} />

                            Listen Again

                        </button>

                    </div>

                )}

            </div>

        </MobileLayout>

    );

}