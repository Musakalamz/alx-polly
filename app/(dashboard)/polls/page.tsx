import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PollsPage() {
  // Mock data - replace with actual data fetching
  const polls = [
    {
      id: 1,
      title: "Favorite Programming Language",
      description: "What programming language do you prefer for web development?",
      totalVotes: 42,
      status: "Active"
    },
    {
      id: 2,
      title: "Best Frontend Framework",
      description: "Which frontend framework do you think is the best for modern web development?",
      totalVotes: 28,
      status: "Active"
    },
    {
      id: 3,
      title: "Preferred Database",
      description: "What database do you prefer for your projects?",
      totalVotes: 35,
      status: "Closed"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{poll.title}</CardTitle>
                <Badge variant={poll.status === "Active" ? "default" : "secondary"}>
                  {poll.status}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {poll.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {poll.totalVotes} votes
                </span>
                <Link href={`/polls/${poll.id}`}>
                  <Button variant="outline" size="sm">
                    View Poll
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
