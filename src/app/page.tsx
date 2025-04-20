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

    const fullCommand = currentCommand.trim();
    const commandParts = fullCommand.split(' ');
    const command = commandParts[0].toLowerCase();
    
    // Add command to input history for arrow key navigation
    setCommandInputHistory([fullCommand, ...commandInputHistory]);
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
              <li><strong>pwd</strong> - Display current URL path</li>
              <li><strong>date</strong> - Show current date and time</li>
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
          <div className="space-y-2">
            <p>Contact Information:</p>
            <div className="pl-4 space-y-2 font-mono">
              <div>
                <span className="text-[#ffcc00]">$ </span>
                <span>GitHub: </span>
                <a 
                  href="https://github.com/nimishgj" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#33ff33] hover:underline"
                >
                  https://github.com/nimishgj
                </a>
              </div>
              <div>
                <span className="text-[#ffcc00]">$ </span>
                <span>LinkedIn: </span>
                <a 
                  href="https://linkedin.com/in/nimishagj" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#33ff33] hover:underline"
                >
                  https://linkedin.com/in/nimishagj
                </a>
              </div>
              <div>
                <span className="text-[#ffcc00]">$ </span>
                <span>Email: </span>
                <a 
                  href="mailto:nimishgj444@gmail.com" 
                  className="text-[#33ff33] hover:underline"
                >
                  nimishgj444@gmail.com
                </a>
              </div>
            </div>
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
        
      case "whoami":
        result = userName || "Not logged in";
        break;
        
      case "ls":
        result = (
          <div className="font-mono">
            <div className="text-[#33ff33]">about</div>
            <div className="text-[#33ff33]">skills</div>
            <div className="text-[#33ff33]">experience</div>
            <div className="text-[#33ff33]">projects</div>
            <div className="text-[#33ff33]">contact</div>
          </div>
        );
        break;
        
      case "date":
        result = new Date().toString();
        break;
        
      case "echo":
        const echoText = fullCommand.substring(fullCommand.indexOf(' ') + 1);
        result = echoText || "";
        break;

      default:
        result = `Command not found: '${fullCommand}'. Type 'help' for available commands.`;
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
            <div className="h-full p-4 flex flex-col justify-start">
              <p className="text-[#33ff33] mb-1">Welcome to terminal v1.0.0</p>
              <p className="text-[#cccccc] mb-4">Type your username to continue</p>
              <div className="mb-6">
                <TypeAnimation
                  sequence={[
                    "$ whoami",
                  ]}
                  wrapper="div"
                  cursor={true}
                  speed={50}
                  className="text-[#ffcc00]"
                />
              </div>
              <form onSubmit={handleLogin} className="flex items-center">

                <input
                  ref={loginInputRef}
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="command-input ml-2 bg-transparent border-none outline-none text-white"
                  autoFocus
                  placeholder="guest"
                  spellCheck="false"
                />
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
