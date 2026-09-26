import React, { useState } from 'react';
import { Code, BookOpen, Layers, CheckCircle2, Brain, Sparkles, FileText, Share2 } from 'lucide-react';

interface SoftwareEngineeringViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const SoftwareEngineeringView: React.FC<SoftwareEngineeringViewProps> = ({ onOpenAITutor }) => {
  const [selectedTopic, setSelectedTopic] = useState('sdlc');

  const topics = [
    {
      id: 'sdlc',
      title: 'Software Development Life Cycle (SDLC)',
      overview: 'Structured process of planning, creating, testing, and deploying high-quality software systems.',
      keyConcepts: [
        'Requirements Engineering & SRS Document',
        'Architectural System Design & ER Diagrams',
        'Implementation & Modular Refactoring',
        'Verification & Acceptance Testing (UAT)',
        'Deployment & CI/CD Automated Pipelines'
      ],
      umlDiagram: `[ User Request ] --> ( Requirement Analysis )
                           |
                           v
                   ( SRS Document )
                           |
                           v
                [ System Architecture ] --> [ Database Schema ]
                           |
                           v
                 ( Agile Sprint Iterations )
                           |
                           v
                [ Automated CI/CD Deployment ]`
    },
    {
      id: 'agile-scrum',
      title: 'Agile Software Development & Scrum Framework',
      overview: 'Iterative, customer-centric framework prioritizing working software, 2-week sprints, and continuous feedback.',
      keyConcepts: [
        'Agile Manifesto & 12 Principles',
        'Scrum Roles: Product Owner, Scrum Master, Dev Squad',
        'Scrum Ceremonies: Sprint Planning, Daily Standup, Review, Retrospective',
        'User Stories & Fibonacci Story Point Estimations',
        'Velocity Tracking & Burndown Metrics'
      ],
      umlDiagram: `[ Product Backlog ] --> [ Sprint Planning ] --> [ Sprint Backlog ]
                                                       |
                                                       v
                                            [ 2-Week Sprint Execution ]
                                                       |
                                                       +--> [ Daily 15-min Standup ]
                                                       |
                                                       v
                                            [ Potentially Shippable Increment ]
                                                       |
                                                       v
                                            [ Sprint Retrospective ]`
    },
    {
      id: 'uml',
      title: 'Unified Modeling Language (UML) Diagrams',
      overview: 'Standardized visual modeling language for structural and behavioral software architecture specification.',
      keyConcepts: [
        'Structural: Class Diagrams, Component Diagrams, Deployment Diagrams',
        'Behavioral: Sequence Diagrams, Use Case Diagrams, Activity Diagrams, State Machine',
        'Cardinality & Relationships (Association, Aggregation, Composition, Inheritance)',
        'Design Pattern Visualization'
      ],
      umlDiagram: `+-----------------------+           +-----------------------+
|        User           |           |        Order          |
+-----------------------+           +-----------------------+
| - userId: String      |  1     *  | - orderId: String     |
| - email: String       |----------->| - totalAmount: float  |
+-----------------------+           +-----------------------+
| + placeOrder(): void  |           | + calculateTax(): float|
+-----------------------+           +-----------------------+`
    },
    {
      id: 'design-patterns',
      title: 'Gang of Four (GoF) Software Design Patterns',
      overview: 'Reusable battle-tested architectural solutions to common object-oriented software design problems.',
      keyConcepts: [
        'Creational: Singleton, Factory Method, Abstract Factory, Builder',
        'Structural: Adapter, Decorator, Facade, Proxy',
        'Behavioral: Observer, Strategy, Command, State',
        'SOLID Principles (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)'
      ],
      umlDiagram: `Singleton Pattern Diagram:
+-------------------------------+
|          Singleton            |
+-------------------------------+
| - instance: Singleton         |
+-------------------------------+
| + getInstance(): Singleton    |
| - Singleton() // Private      |
+-------------------------------+`
    }
  ];

  const currentTopic = topics.find(t => t.id === selectedTopic) || topics[0];

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Code className="w-3.5 h-3.5" /> University Level Software Engineering Notes
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Software Engineering & Architecture</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Master SDLC, Agile Scrum, UML Modeling, SRS Requirements, Design Patterns, QA Testing & Software Architecture.
          </p>
        </div>

        <button
          onClick={() => onOpenAITutor(`Explain Design Patterns in depth: Singleton, Factory, and Observer with code examples`)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition shrink-0"
        >
          <Brain className="w-4 h-4 text-amber-300" /> Ask AI SE Architect
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Topic Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">SE Modules</h3>
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs transition space-y-1 ${
                selectedTopic === t.id
                  ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
              }`}
            >
              <h4 className="font-bold">{t.title}</h4>
              <p className="text-[11px] opacity-80 line-clamp-2">{t.overview}</p>
            </button>
          ))}
        </div>

        {/* Detail Reader */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Software Engineering Curriculum</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{currentTopic.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{currentTopic.overview}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Core Engineering Concepts
            </h3>
            <ul className="space-y-2 text-xs">
              {currentTopic.keyConcepts.map((kc, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-medium">{kc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Architectural UML / Process Flow Diagram
            </h3>
            <div className="bg-slate-950 text-indigo-300 p-5 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              <pre>{currentTopic.umlDiagram}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
