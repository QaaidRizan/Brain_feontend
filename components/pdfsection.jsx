"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User, Upload, Send, FileText } from "lucide-react";

const PdfChatSection = () => {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFileId(response.data.file_id);
      setMessages([
        {
          id: Date.now(),
          text: "Your file has been uploaded successfully. You can now ask questions about the document.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !fileId) {
      alert("Please upload a PDF file before sending a query.");
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/query-file", {
        file_id: fileId,
        prompt: userMessage.text,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error querying file:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm unable to respond currently. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text) => {
    if (!text.includes("•")) return <p className="text-left">{text}</p>;

    const parts = text.split("•");
    return (
      <div className="text-left">
        <p>{parts[0]}</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          {parts.slice(1).map((part, index) => (
            <li key={index}>{part.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">PDF Chat Assistant</h2>
        <div className="bg-primary/10 text-primary p-1 rounded-full">
          <FileText className="h-4 w-4" />
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload your medical report (PDF):
        </label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
          >
            <Upload className="inline-block mr-2 h-4 w-4" />
            Upload File
          </label>
          {file && <span className="text-sm text-gray-600">{file.name}</span>}
        </div>
      </div>

      {/* Chat Section */}
      <Card className="flex-grow mb-4 overflow-hidden">
        <CardContent className="p-3 h-[400px] overflow-y-auto">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] flex ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-2"
                        : "bg-muted text-foreground mr-2"
                    }`}
                  >
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {formatMessageText(message.text)}
                    <p
                      className={`text-xs opacity-70 mt-1 ${
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-foreground/70"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] flex flex-row">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-muted text-foreground mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="inline-block px-4 py-2 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          placeholder="Ask a question about the report..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow"
          disabled={isLoading || !fileId}
        />
        <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim() || !fileId}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default PdfChatSection;