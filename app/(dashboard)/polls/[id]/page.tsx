"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PollPageProps {
  params: {
    id: string;
  };
}

export default function PollPage({ params }: PollPageProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  // Mock data - replace with actual data fetching based on params.id
  const poll = {
    id: params.id,
    title: "Favorite Programming Language",
    description: "What programming language do you prefer for web development?",
    options: [
      { id: "javascript", text: "JavaScript", votes: 15 },
      { id: "python", text: "Python", votes: 12 },
      { id: "java", text: "Java", votes: 8 },
      { id: "csharp", text: "C#", votes: 7 },
    ],
    totalVotes: 42,
    status: "Active",
  };

  const handleVote = () => {
    if (selectedOption) {
      // Handle vote submission
      console.log(`Voted for: ${selectedOption}`);
      setHasVoted(true);
    }
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0
      ? Math.round((votes / poll.totalVotes) * 100)
      : 0;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/polls"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Polls
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{poll.title}</h1>
            <p className="text-gray-600 mb-4">{poll.description}</p>
          </div>
          <Badge variant={poll.status === "Active" ? "default" : "secondary"}>
            {poll.status}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cast Your Vote</CardTitle>
          <CardDescription>
            Select your preferred option and click vote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasVoted ? (
            <div className="space-y-6">
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
              >
                {poll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={handleVote}
                disabled={!selectedOption}
                className="w-full"
              >
                Vote
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Results</h3>
              {poll.options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{option.text}</span>
                    <span className="text-sm text-gray-600">
                      {option.votes} votes ({getPercentage(option.votes)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getPercentage(option.votes)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Total votes: {poll.totalVotes}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link href="/polls">Share this poll</Link>
        </Button>
      </div>
    </div>
  );
}