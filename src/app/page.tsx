"use client";

import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type CommandResult = {
  command: string;
  output: React.ReactNode | string;
};

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([]);
  const [commandInputHistory, setCommandInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loginName, setLoginName] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [storedCommand, setStoredCommand] = useState("");

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current && loggedIn) {
      inputRef.current.focus();
    }
    if (loginInputRef.current && !loggedIn) {
      loginInputRef.current.focus();
    }
  }, [commandHistory, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      const timeout = setTimeout(() => {
        setShowWelcome(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim()) {
      setUserName(loginName.trim());
      setLoggedIn(true);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const command = currentCommand.trim().toLowerCase();
    // Add command to input history for arrow key navigation
    setCommandInputHistory([command, ...commandInputHistory]);
    setHistoryIndex(-1);
    
    let result: React.ReactNode | string = "Command not found. Type 'help' for available commands.";

    switch (command) {
      case "help":
        result = (
          <div>
            <p className="mb-2">Available commands:</p>
            <ul className="list-disc pl-5">
              <li><strong>about</strong> - Learn about Nimisha G J</li>
              <li><strong>skills</strong> - View technical skills</li>
              <li><strong>experience</strong> - View work experience</li>
              <li><strong>projects</strong> - View notable projects</li>
              <li><strong>contact</strong> - Contact information</li>
              <li><strong>clear</strong> - Clear the terminal</li>
              <li><strong>help</strong> - Show this help message</li>
            </ul>
          </div>
        );
        break;

      case "about":
        result = (
          <div className="space-y-2">
            <p>Hello! I'm <strong>Nimisha G J</strong>, a software developer with 1 year of experience.</p>
            <p>I'm currently working on observability solutions at Infraspec, helping companies monitor and understand their systems better.</p>
            <p>I'm passionate about building robust backend systems and cloud infrastructure.</p>
            <p>When I'm not coding, you'll find me exploring the outdoors through trekking, traveling, and bike riding. As a computer science engineering student, I'm on a continuous journey to expand my knowledge and contribute to the ever-evolving tech landscape. Let's connect and build something incredible together!</p>
          </div>
        );
        break;

      case "skills":
        result = (
          <div className="space-y-3">
            <div>
              <p className="text-[#ffcc00] font-bold">Languages:</p>
              <p>JavaScript, TypeScript, Python, Go, C++, Java, Ruby</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Frontend:</p>
              <p>HTML, CSS, React, Svelte, Next.js</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Backend:</p>
              <p>Express, FastAPI, Rails, BentoML</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Databases:</p>
              <p>MySQL, PostgreSQL, ClickHouse, Redis</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">DevOps & Cloud:</p>
              <p>Docker, Kubernetes, AWS (ECS, EKS, EC2, VPC, S3, CloudWatch), Linux</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Observability:</p>
              <p>OpenTelemetry, FluentBit, Jaeger, Grafana, Prometheus</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Others:</p>
              <p>Figma, Jest, RabbitMQ</p>
            </div>
          </div>
        );
        break;

      case "experience":
        result = (
          <div className="space-y-4">
            <div>
              <p className="text-[#ffcc00] font-bold">Software Engineer at Infraspec (July 2024 - Present)</p>
              <p>• Working on observability solutions</p>
              <p>• Created a payout management system from scratch</p>
              <p>• Implemented a complete EKS setup with ingress controller</p>
              <p>• Extensive work on Go backend</p>
              <p>• Set up complete observability for company clients</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Software Development Intern at Infraspec (January 2024 - April 2024)</p>
              <p>• Developed an expense management application using Rails</p>
              <p>• Configured netbooting for Raspberry Pi</p>
              <p>• Set up ECS infrastructure</p>
            </div>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="space-y-4">
            <div>
              <p className="text-[#ffcc00] font-bold">Payout Management System (Infraspec)</p>
              <p>Developed a system from scratch to handle and automate payment distributions.</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Kubernetes Infrastructure (Infraspec)</p>
              <p>Implemented a complete EKS setup with ingress controller for robust containerized applications.</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Expense Management Application (Infraspec Internship)</p>
              <p>Built a Rails-based expense tracking application for my company that streamlines the expense report process.</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Raspberry Pi Netboot Configuration (Infraspec Internship)</p>
              <p>Set up a network boot solution for Raspberry Pi devices to enable diskless booting.</p>
            </div>
            <div>
              <p className="text-[#ffcc00] font-bold">Client Observability Platform</p>
              <p>Helped clients set up comprehensive observability solutions to monitor their applications.</p>
            </div>
          </div>
        );
        break;

      case "contact":
        result = (
          <div className="space-y-5">
            <p className="text-xl">Feel free to connect with me:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://github.com/nimishgj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-4 rounded-lg transition-all duration-300 bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] hover:shadow-lg hover:scale-105"
              >
                <FaGithub className="text-2xl mr-3 text-white" />
                <div>
                  <div className="font-bold text-white">GitHub</div>
                  <div className="text-sm text-gray-400">@nimishgj</div>
                </div>
              </a>
              <a 
                href="https://linkedin.com/in/nimishagj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-4 rounded-lg transition-all duration-300 bg-[#0a66c2] border border-[#0a66c2] hover:bg-[#0077b5] hover:shadow-lg hover:scale-105"
              >
                <FaLinkedin className="text-2xl mr-3 text-white" />
                <div>
                  <div className="font-bold text-white">LinkedIn</div>
                  <div className="text-sm text-gray-200">Connect Professionally</div>
                </div>
              </a>
              <a 
                href="mailto:nimishgj444@gmail.com" 
                className="flex items-center p-4 rounded-lg transition-all duration-300 bg-[#ea4335] border border-[#ea4335] hover:bg-[#d93025] hover:shadow-lg hover:scale-105"
              >
                <FaEnvelope className="text-2xl mr-3 text-white" />
                <div>
                  <div className="font-bold text-white">Email</div>
                  <div className="text-sm text-gray-200">nimishgj444@gmail.com</div>
                </div>
              </a>
            </div>
            <p className="mt-4 text-gray-400 italic">Let's build something amazing together!</p>
          </div>
        );
        break;

      case "clear":
        setCommandHistory([]);
        setCurrentCommand("");
        return;
        
      case "pwd":
        result = typeof window !== "undefined" ? window.location.href : "Browser environment not available";
        break;
        
      case "exit":
        if (typeof window !== "undefined") {
          window.close();
          result = "Closing tab...";
        } else {
          result = "Cannot exit in current environment.";
        }
        break;

      default:
        result = `Command not found: '${command}'. Type 'help' for available commands.`;
        break;
    }

    setCommandHistory([...commandHistory, { command, output: result }]);
    setCurrentCommand("");
  };

  return (
    <main className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <div className="terminal w-full">
        <div className="terminal-header">
          <div className="terminal-btn close-btn"></div>
          <div className="terminal-btn minimize-btn"></div>
          <div className="terminal-btn maximize-btn"></div>
          <div className="ml-4 text-white">nimisha@portfolio ~ </div>
        </div>

        <div ref={terminalRef} className="terminal-content h-[calc(100%-40px)] overflow-y-auto">
          {!loggedIn ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-4 text-center">
                <TypeAnimation
                  sequence={[
                    "Welcome to the terminal",
                    1000,
                    "Please enter your name to continue...",
                  ]}
                  wrapper="div"
                  cursor={true}
                  speed={50}
                  className="mb-4"
                />
              </div>
              <form onSubmit={handleLogin} className="flex items-center">
                <span className="text-[#33ff33]">login:</span>
                <input
                  ref={loginInputRef}
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="command-input ml-2 px-2 border-b border-[#33ff33] bg-transparent"
                  autoFocus
                  placeholder="Enter your name"
                />
                <button type="submit" className="ml-2 text-[#33ff33] hover:text-white">
                  ⏎
                </button>
              </form>
            </div>
          ) : showWelcome ? (
            <TypeAnimation
              sequence={[
                `Hello ${userName}! Welcome to Nimisha G J's portfolio`,
                1000,
                "Type 'help' to see available commands",
              ]}
              wrapper="div"
              cursor={true}
              speed={50}
              className="mb-4"
            />
          ) : (
            <>
              <div className="mb-4">
                <p>Hello {userName}! Welcome to Nimisha G J's terminal portfolio</p>
                <p>Type 'help' to see available commands</p>
              </div>

              {commandHistory.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="command-line">
                    <span className="command-prompt">nimisha@portfolio:~$</span>
                    <span className="ml-2">{item.command}</span>
                  </div>
                  <div className="command-result">{item.output}</div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="command-line">
                <span className="command-prompt">nimisha@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      if (commandInputHistory.length > 0) {
                        // Save current input if moving from initial position
                        if (historyIndex === -1) {
                          setStoredCommand(currentCommand);
                        }
                        
                        const newIndex = Math.min(historyIndex + 1, commandInputHistory.length - 1);
                        setHistoryIndex(newIndex);
                        setCurrentCommand(commandInputHistory[newIndex]);
                      }
                    } else if (e.key === "ArrowDown") {
                      e.preventDefault();
                      if (historyIndex > 0) {
                        // Move back in history
                        const newIndex = historyIndex - 1;
                        setHistoryIndex(newIndex);
                        setCurrentCommand(commandInputHistory[newIndex]);
                      } else if (historyIndex === 0) {
                        // Return to stored command when going below history
                        setHistoryIndex(-1);
                        setCurrentCommand(storedCommand);
                      }
                    }
                  }}
                  className="command-input ml-2"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
