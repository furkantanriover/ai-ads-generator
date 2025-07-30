import React from "react";

const WorkspacePage = () => {
  return (
    <div className=" bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-primary">
          AI Ads Generator Workspace
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-3">Create New Campaign</h2>
            <p className="text-muted-foreground mb-4">
              Start generating amazing AI-powered advertisements for your
              business.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
              Get Started
            </button>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-3">Recent Campaigns</h2>
            <p className="text-muted-foreground mb-4">
              View and manage your existing advertisement campaigns.
            </p>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:opacity-90">
              View All
            </button>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Dark Mode Test
          </h3>
          <p className="text-muted-foreground">
            Bu metin dark mode&apos;da da net bir şekilde görünüyor olmalı.
            Header&apos;daki 🌙/☀️ butonuna tıklayarak tema değiştirebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
