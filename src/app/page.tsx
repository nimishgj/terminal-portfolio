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
  
  // Store markdown content
  const [aboutContent, setAboutContent] = useState("");
  const [skillsContent, setSkillsContent] = useState("");
  const [experienceContent, setExperienceContent] = useState("");
  const [projectsContent, setProjectsContent] = useState("");
  const [contactContent, setContactContent] = useState("");
  const [contentLoading, setContentLoading] = useState(true);

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
  
  // Add click-anywhere-to-focus behavior
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && loggedIn) {
        inputRef.current.focus();
      } else if (loginInputRef.current && !loggedIn) {
        loginInputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [loggedIn]);
  
  // Load markdown content from API
  useEffect(() => {
    const fetchContent = async (file: string) => {
      try {
        const response = await fetch(`/api/content?file=${file}`);
        if (response.ok) {
          const data = await response.json();
          return data.content;
        }
        return `Error loading ${file}`;
      } catch (error) {
        console.error(`Error fetching ${file}:`, error);
        return `Failed to load ${file}`;
      }
    };
    
    const loadAllContent = async () => {
      setContentLoading(true);
      try {
        const [about, skills, experience, projects, contact] = await Promise.all([
          fetchContent('about.md'),
          fetchContent('skills.md'),
          fetchContent('experience.md'),
          fetchContent('projects.md'),
          fetchContent('contact.md')
        ]);
        
        setAboutContent(about);
        setSkillsContent(skills);
        setExperienceContent(experience);
        setProjectsContent(projects);
        setContactContent(contact);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setContentLoading(false);
      }
    };
    
    if (loggedIn) {
      loadAllContent();
    }
  }, [loggedIn]);

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
             <li><strong>help</strong> - Show this help message</li>
            </ul>
          </div>
        );
        break;

      case "about":
        if (contentLoading) {
          result = "Loading about content...";
        } else {
          const formattedContent = aboutContent
            .replace(/##\s+(.+)$/gm, '<h2 class="text-[#ffcc00] font-bold mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          
          result = (
            <div className="space-y-2 whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          );
        }
        break;

      case "skills":
        if (contentLoading) {
          result = "Loading skills content...";
        } else {
          const formattedContent = skillsContent
            .replace(/##\s+(.+)$/gm, '<h2 class="text-[#ffcc00] font-bold mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          
          result = (
            <div className="space-y-2 whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          );
        }
        break;

      case "experience":
        if (contentLoading) {
          result = "Loading experience content...";
        } else {
          const formattedContent = experienceContent
            .replace(/##\s+(.+)$/gm, '<h2 class="text-[#ffcc00] font-bold mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/•\s+(.+)$/gm, '<li>$1</li>');
          
          result = (
            <div className="space-y-2 whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          );
        }
        break;

      case "projects":
        if (contentLoading) {
          result = "Loading projects content...";
        } else {
          const formattedContent = projectsContent
            .replace(/##\s+(.+)$/gm, '<h2 class="text-[#ffcc00] font-bold mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          
          result = (
            <div className="space-y-2 whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          );
        }
        break;

      case "contact":
        if (contentLoading) {
          result = "Loading contact content...";
        } else {
          const formattedContent = contactContent
            .replace(/##\s+(.+)$/gm, '<h2 class="text-[#ffcc00] font-bold mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // For contact links with $ prefix
            .replace(/\$\s+([^:]+):\s+([^\n]+)/g, 
              '<div><span class="text-[#ffcc00]">$</span> <span>$1:</span> <a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#33ff33] hover:underline">$2</a></div>');
          
          result = (
            <div className="space-y-2 whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          );
        }
        break;

      case "clear":
        setCommandHistory([]);
        setCurrentCommand("");
        return;
        
      case "cat":
        const fileToShow = commandParts[1];
        
        if (!fileToShow) {
          result = "cat: missing file operand";
        } else {
          let content = "";
          
          if (fileToShow === "about" && !contentLoading) {
            content = aboutContent;
          } else if (fileToShow === "skills" && !contentLoading) {
            content = skillsContent;
          } else if (fileToShow === "experience" && !contentLoading) {
            content = experienceContent;
          } else if (fileToShow === "projects" && !contentLoading) {
            content = projectsContent;
          } else if (fileToShow === "contact" && !contentLoading) {
            content = contactContent;
          } else {
            result = `cat: ${fileToShow}: No such file or directory`;
            break;
          }
          
          if (contentLoading) {
            result = "Loading file content...";
          } else {
            result = <div className="whitespace-pre-wrap font-mono">{content}</div>;
          }
        }
        break;
        
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
            />
          ) : (
            <>
              <div className="mb-4 welcome-message">
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
