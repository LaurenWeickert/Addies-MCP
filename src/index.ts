#!/usr/bin/env node

/**
 * Semesters Development MCP Server
 * Specialized AI assistant for building trauma-informed, dyslexia-friendly educational software
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ToolSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Dyslexia-friendly UI configuration
const DYSLEXIA_CONFIG = {
  fonts: {
    primary: 'OpenDyslexic, Verdana, Arial, sans-serif',
    fallback: 'Arial, sans-serif',
  },
  colors: {
    background: '#F5F5DC', // cream
    text: '#333333',       // dark grey
    success: '#87CEEB',    // sky blue
    button: '#90EE90',     // light green
    stress: '#FFB6C1',     // light pink
  },
  spacing: {
    lineHeight: '1.5',
    letterSpacing: '0.05em',
    wordSpacing: '0.1em',
  },
};

// Orton-Gillingham curriculum data
const OG_CURRICULUM = {
  level1: {
    phonemes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    focus: 'Single letter sounds',
    masteryRequirement: 90,
  },
  level2: {
    phonemes: ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
    words: ['cat', 'dog', 'run', 'big', 'hat'],
    focus: 'CVC words',
    masteryRequirement: 85,
  },
  level3: {
    phonemes: ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    words: ['bath', 'ship', 'thin'],
    focus: 'Consonant digraphs',
    masteryRequirement: 85,
  },
};

// Trauma-informed language guidelines
const TRAUMA_INFORMED_PRINCIPLES = {
  avoid: [
    'wrong', 'incorrect', 'mistake', 'error', 'failed', 'try again',
    'you should', 'you need to', 'that\'s not right', 'no'
  ],
  encourage: [
    'great try', 'let\'s practice', 'you\'re learning', 'nice work',
    'want to try together', 'your brain is growing', 'every attempt helps'
  ],
  principles: [
    'No failure states',
    'Child has control',
    'Unconditional positive regard',
    'Multiple pathways to success',
    'Celebrate effort over accuracy'
  ]
};

class SemestersMCP {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'semesters-dev-mcp',
        version: '1.0.0',
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupTools();
    this.setupHandlers();
  }

  private setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_dyslexia_ui',
            description: 'Generate dyslexia-friendly UI components',
            inputSchema: {
              type: 'object',
              properties: {
                componentType: {
                  type: 'string',
                  enum: ['button', 'text', 'input', 'card'],
                  description: 'Type of UI component to generate'
                },
                content: {
                  type: 'string',
                  description: 'Content for the component'
                },
                intent: {
                  type: 'string',
                  enum: ['primary', 'secondary', 'comfort', 'celebration'],
                  description: 'Visual intent of the component'
                }
              },
              required: ['componentType', 'content']
            }
          },
          {
            name: 'review_trauma_content',
            description: 'Review content for trauma-informed language',
            inputSchema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Text content to review'
                },
                context: {
                  type: 'string',
                  description: 'Context where this content appears (optional)'
                }
              },
              required: ['content']
            }
          },
          {
            name: 'validate_og_activity',
            description: 'Validate activity against Orton-Gillingham principles',
            inputSchema: {
              type: 'object',
              properties: {
                activity: {
                  type: 'object',
                  description: 'Activity object to validate'
                },
                targetLevel: {
                  type: 'number',
                  description: 'Target OG level (1-5)'
                }
              },
              required: ['activity', 'targetLevel']
            }
          },
          {
            name: 'generate_phoneme_activity',
            description: 'Generate multisensory phoneme practice activity',
            inputSchema: {
              type: 'object',
              properties: {
                phoneme: {
                  type: 'string',
                  description: 'Target phoneme to practice'
                },
                modalities: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['visual', 'auditory', 'kinesthetic', 'tactile']
                  },
                  description: 'Learning modalities to include'
                }
              },
              required: ['phoneme', 'modalities']
            }
          },
          {
            name: 'review_code_safety',
            description: 'Review code for trauma-informed principles',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Code to review'
                },
                language: {
                  type: 'string',
                  description: 'Programming language'
                }
              },
              required: ['code']
            }
          },
          {
            name: 'generate_stress_protocol',
            description: 'Generate stress detection and response protocol',
            inputSchema: {
              type: 'object',
              properties: {
                triggerType: {
                  type: 'string',
                  enum: ['behavioral', 'physiological', 'performance'],
                  description: 'Type of stress trigger to handle'
                },
                severity: {
                  type: 'string',
                  enum: ['mild', 'moderate', 'high'],
                  description: 'Stress severity level'
                }
              },
              required: ['triggerType', 'severity']
            }
          },
          {
            name: 'generate_engagement_activity',
            description: 'Generate intrinsically motivating learning activity',
            inputSchema: {
              type: 'object',
              properties: {
                phoneme: {
                  type: 'string',
                  description: 'Target phoneme to practice'
                },
                theme: {
                  type: 'string',
                  enum: ['dragons', 'space', 'magic', 'animals', 'adventure', 'mystery'],
                  description: 'Story theme for engagement'
                },
                inputMethods: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['touch', 'voice', 'camera', 'microphone', 'bluetooth']
                  },
                  description: 'Available device capabilities'
                },
                stressLevel: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  description: 'Current child stress level from Whoop'
                }
              },
              required: ['phoneme', 'theme', 'inputMethods']
            }
          },
          {
            name: 'validate_engagement_safety',
            description: 'Check if engagement mechanic might cause trauma or pressure',
            inputSchema: {
              type: 'object',
              properties: {
                mechanic: {
                  type: 'string',
                  description: 'Engagement mechanic to validate'
                },
                context: {
                  type: 'string',
                  description: 'Context where mechanic would be used'
                }
              },
              required: ['mechanic']
            }
          }
        ]
      };
    });
  }

  private setupHandlers() {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'generate_dyslexia_ui':
          return this.generateDyslexiaUI(args);
        
        case 'review_trauma_content':
          return this.reviewTraumaContent(args);
        
        case 'validate_og_activity':
          return this.validateOGActivity(args);
        
        case 'generate_phoneme_activity':
          return this.generatePhonemeActivity(args);
        
        case 'review_code_safety':
          return this.reviewCodeSafety(args);
        
        case 'generate_stress_protocol':
          return this.generateStressProtocol(args);
        
        case 'generate_engagement_activity':
          return this.generateEngagementActivity(args);
        
        case 'validate_engagement_safety':
          return this.validateEngagementSafety(args);
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async generateDyslexiaUI(args: any) {
    const { componentType, content, intent = 'primary' } = args;
    
    const getColorScheme = (intent: string) => {
      switch (intent) {
        case 'comfort':
          return { bg: 'bg-pink-100', border: 'border-pink-200', text: 'text-pink-900' };
        case 'celebration':
          return { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-900' };
        case 'secondary':
          return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-900' };
        default:
          return { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-900' };
      }
    };

    const colors = getColorScheme(intent);
    
    let component = '';
    
    switch (componentType) {
      case 'button':
        component = `
<button 
  className="
    font-['OpenDyslexic,Verdana,Arial,sans-serif'] 
    text-xl px-8 py-4 rounded-lg
    ${colors.bg} hover:${colors.bg.replace('100', '200')}
    ${colors.border} border-2
    ${colors.text}
    transition-colors duration-200
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    min-h-[60px] min-w-[120px]
    tracking-wide
  "
  aria-label="${content}"
>
  ${content}
</button>`;
        break;
        
      case 'text':
        component = `
<p 
  className="
    font-['OpenDyslexic,Verdana,Arial,sans-serif']
    text-lg leading-relaxed tracking-wide
    ${colors.text}
    max-w-prose
  "
>
  ${content}
</p>`;
        break;
        
      case 'input':
        component = `
<input
  className="
    font-['OpenDyslexic,Verdana,Arial,sans-serif']
    text-lg px-4 py-3 rounded-lg
    border-2 ${colors.border}
    focus:border-blue-300 focus:ring-2 focus:ring-blue-200
    bg-cream-50 min-h-[50px]
    tracking-wide
  "
  placeholder="${content}"
  aria-label="${content}"
/>`;
        break;
        
      case 'card':
        component = `
<div 
  className="
    ${colors.bg} ${colors.border} border-2 rounded-lg
    p-6 shadow-sm
    font-['OpenDyslexic,Verdana,Arial,sans-serif']
  "
>
  <div className="text-lg ${colors.text} leading-relaxed tracking-wide">
    ${content}
  </div>
</div>`;
        break;
    }

    return {
      content: [
        {
          type: 'text',
          text: `Generated dyslexia-friendly ${componentType} component:\n\n${component}\n\nFeatures:\n- OpenDyslexic font with fallbacks\n- High contrast colors\n- Large touch targets (min 44px)\n- Generous spacing and padding\n- Proper ARIA labels\n- Focus indicators`
        }
      ]
    };
  }

  private async reviewTraumaContent(args: any) {
    const { content, context = '' } = args;
    
    const issues: string[] = [];
    const alternatives: string[] = [];
    
    // Check for problematic language
    TRAUMA_INFORMED_PRINCIPLES.avoid.forEach(word => {
      if (content.toLowerCase().includes(word.toLowerCase())) {
        issues.push(`Contains potentially triggering word: "${word}"`);
      }
    });
    
    // Check for pressure/judgment language
    const pressureWords = ['must', 'should', 'have to', 'need to', 'required'];
    pressureWords.forEach(word => {
      if (content.toLowerCase().includes(word)) {
        issues.push(`May create pressure with word: "${word}"`);
      }
    });
    
    // Generate positive alternatives
    if (issues.length > 0) {
      alternatives.push(
        "Great try! Let's practice that together.",
        "You're learning! Every attempt makes your brain stronger.",
        "Want to try another way?",
        "Nice work exploring that sound!"
      );
    }
    
    const isTraumaInformed = issues.length === 0;
    
    return {
      content: [
        {
          type: 'text',
          text: `TRAUMA-INFORMED CONTENT REVIEW\n\nContent: "${content}"\nContext: ${context}\n\n${isTraumaInformed ? '✅ TRAUMA-INFORMED COMPLIANT' : '❌ ISSUES DETECTED'}\n\n${issues.length > 0 ? `Issues:\n${issues.map(i => `- ${i}`).join('\n')}\n\nPositive Alternatives:\n${alternatives.map(a => `- "${a}"`).join('\n')}` : 'No trauma-informed issues detected. Content supports psychological safety.'}\n\nPrinciples Applied:\n${TRAUMA_INFORMED_PRINCIPLES.principles.map(p => `- ${p}`).join('\n')}`
        }
      ]
    };
  }

  private async validateOGActivity(args: any) {
    const { activity, targetLevel } = args;
    
    const levelData = Object.values(OG_CURRICULUM)[targetLevel - 1];
    if (!levelData) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Invalid OG level: ${targetLevel}. Must be 1-3.`
          }
        ]
      };
    }
    
    const validation = {
      isSequential: true,
      isMultisensory: false,
      hasPhonemesFocus: false,
      meetsLevel: false,
      issues: [] as string[],
      recommendations: [] as string[]
    };
    
    // Check for multisensory components
    const modalities = ['visual', 'auditory', 'kinesthetic', 'tactile'];
    const activityString = JSON.stringify(activity).toLowerCase();
    const modalityCount = modalities.filter(m => activityString.includes(m)).length;
    
    validation.isMultisensory = modalityCount >= 2;
    if (!validation.isMultisensory) {
      validation.issues.push('Activity should include multiple sensory modalities');
      validation.recommendations.push('Add visual, auditory, and kinesthetic elements');
    }
    
    // Check phoneme focus
    if (levelData.phonemes) {
      validation.hasPhonemesFocus = levelData.phonemes.some(p => 
        activityString.includes(p.toLowerCase())
      );
      
      if (!validation.hasPhonemesFocus) {
        validation.issues.push(`Activity should focus on level ${targetLevel} phonemes: ${levelData.phonemes.join(', ')}`);
      }
    }
    
    validation.meetsLevel = validation.isMultisensory && validation.hasPhonemesFocus;
    
    return {
      content: [
        {
          type: 'text',
          text: `ORTON-GILLINGHAM ACTIVITY VALIDATION\n\nTarget Level: ${targetLevel} - ${levelData.focus}\n\n${validation.meetsLevel ? '✅ OG COMPLIANT' : '❌ NEEDS IMPROVEMENT'}\n\nValidation Results:\n- Sequential: ${validation.isSequential ? '✅' : '❌'}\n- Multisensory: ${validation.isMultisensory ? '✅' : '❌'}\n- Phoneme Focus: ${validation.hasPhonemesFocus ? '✅' : '❌'}\n\n${validation.issues.length > 0 ? `Issues:\n${validation.issues.map(i => `- ${i}`).join('\n')}\n\nRecommendations:\n${validation.recommendations.map(r => `- ${r}`).join('\n')}` : 'Activity meets OG standards!'}`
        }
      ]
    };
  }

  private async generatePhonemeActivity(args: any) {
    const { phoneme, modalities } = args;
    
    const activity = {
      phoneme,
      type: 'multisensory_practice',
      components: {} as any
    };
    
    if (modalities.includes('visual')) {
      activity.components.visual = {
        letterDisplay: `Large, clear display of letter "${phoneme.toUpperCase()}"`,
        visualization: `Child sees the letter in high contrast`,
        animation: `Letter appears with gentle fade-in effect`
      };
    }
    
    if (modalities.includes('auditory')) {
      activity.components.auditory = {
        phonemeSound: `Clear pronunciation of /${phoneme}/ sound`,
        repetition: `Sound plays automatically when letter appears`,
        childRepeat: `Child encouraged to repeat the sound aloud`
      };
    }
    
    if (modalities.includes('kinesthetic')) {
      activity.components.kinesthetic = {
        letterTracing: `Child traces letter shape with finger on screen`,
        airWriting: `Child "writes" letter in the air`,
        bodyMovement: `Associate letter with body movement or gesture`
      };
    }
    
    if (modalities.includes('tactile')) {
      activity.components.tactile = {
        textureAssociation: `Connect letter with tactile experience`,
        hapticFeedback: `Device vibration when letter is traced correctly`,
        physicalProps: `Optional: textured letter cards for real-world practice`
      };
    }
    
    // Add OG-compliant assessment
    activity.components.assessment = {
      masteryIndicators: [
        'Automatic recognition (< 2 seconds)',
        'Correct sound production',
        'Proper letter formation'
      ],
      practiceStructure: 'Present → Model → Practice → Assess → Celebrate'
    };
    
    return {
      content: [
        {
          type: 'text',
          text: `MULTISENSORY PHONEME ACTIVITY\n\nTarget Phoneme: /${phoneme}/\nModalities: ${modalities.join(', ')}\n\nActivity Structure:\n${JSON.stringify(activity, null, 2)}\n\nOG Compliance:\n- Follows systematic phonics progression\n- Includes explicit instruction\n- Provides multisensory reinforcement\n- Builds to automatic recognition\n\nImplementation Notes:\n- Always celebrate attempts, not just accuracy\n- Allow multiple practice opportunities\n- Monitor for stress and adjust accordingly\n- Progress only after mastery demonstrated`
        }
      ]
    };
  }

  private async reviewCodeSafety(args: any) {
    const { code, language = 'typescript' } = args;
    
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check for failure states
    if (code.includes('fail') || code.includes('error') || code.includes('wrong')) {
      issues.push('Code may contain failure states or negative language');
      recommendations.push('Implement positive feedback loops instead of failure states');
    }
    
    // Check for stress-inducing patterns
    if (code.includes('timeout') || code.includes('time limit')) {
      issues.push('Time pressure detected - may cause stress');
      recommendations.push('Remove time limits or make them optional/invisible');
    }
    
    // Check for accessibility
    if (code.includes('onClick') && !code.includes('aria-label')) {
      issues.push('Interactive elements may lack accessibility labels');
      recommendations.push('Add aria-label attributes to all interactive elements');
    }
    
    // Check for positive reinforcement
    const hasPositiveReinforcement = code.includes('celebrate') || 
                                   code.includes('great') || 
                                   code.includes('nice work');
    
    if (!hasPositiveReinforcement) {
      recommendations.push('Add positive reinforcement and celebration for user actions');
    }
    
    const isSafe = issues.length === 0;
    
    return {
      content: [
        {
          type: 'text',
          text: `TRAUMA-INFORMED CODE SAFETY REVIEW\n\n${isSafe ? '✅ CODE IS TRAUMA-SAFE' : '⚠️ SAFETY ISSUES DETECTED'}\n\n${issues.length > 0 ? `Issues Found:\n${issues.map(i => `- ${i}`).join('\n')}\n\n` : ''}Recommendations:\n${recommendations.map(r => `- ${r}`).join('\n')}\n\nTrauma-Informed Coding Principles:\n- No failure states or negative feedback\n- Child maintains control and agency\n- Multiple pathways to success\n- Celebration of effort over accuracy\n- Stress detection and response\n- Accessibility for all learners`
        }
      ]
    };
  }

  private async generateStressProtocol(args: any) {
    const { triggerType, severity } = args;
    
    const protocols = {
      behavioral: {
        mild: {
          detection: ['Slower response times', 'Repeated help requests', 'Shorter responses'],
          response: ['Offer encouragement', 'Provide gentle hints', 'Show progress made'],
          code: `
if (responseTime > averageResponseTime * 1.5) {
  showEncouragement("You're thinking carefully - that's great!");
  offerHint(currentChallenge);
}`
        },
        moderate: {
          detection: ['Multiple wrong attempts', 'Requesting to skip', 'Visible frustration cues'],
          response: ['Switch to easier content', 'Offer break', 'Provide comfort'],
          code: `
if (consecutiveStruggles >= 3) {
  switchToComfortMode();
  showMessage("Let's try something fun together!");
  offerBreak();
}`
        },
        high: {
          detection: ['Attempting to quit', 'Silence after prompts', 'Stress behaviors'],
          response: ['Immediate comfort mode', 'Breathing exercises', 'End session positively'],
          code: `
if (detectedHighStress()) {
  immediateComfortMode();
  showBreathingExercise();
  celebrateWhatWasAccomplished();
}`
        }
      },
      physiological: {
        mild: {
          detection: ['HRV decrease 10-20%', 'Heart rate increase 10-15%'],
          response: ['Gentle pacing adjustment', 'Calming visual cues'],
          code: `
if (hrv < baseline * 0.8) {
  adjustPacing("slower");
  showCalmingVisuals();
}`
        },
        moderate: {
          detection: ['HRV decrease 20-30%', 'Heart rate increase 15-25%'],
          response: ['Pause activity', 'Breathing guidance', 'Comfort content'],
          code: `
if (heartRate > baseline * 1.2) {
  pauseCurrentActivity();
  startBreathingGuide();
  showComfortCharacter();
}`
        },
        high: {
          detection: ['HRV decrease >30%', 'Heart rate increase >25%'],
          response: ['Immediate stop', 'Full comfort mode', 'Recovery focus'],
          code: `
if (stressLevel === "CRITICAL") {
  stopAllActivities();
  activateFullComfortMode();
  focusOnRecovery();
  notifyParent();
}`
        }
      }
    };
    
    const protocol = protocols[triggerType as keyof typeof protocols]?.[severity as keyof typeof protocols.behavioral];
    
    if (!protocol) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Invalid protocol parameters. TriggerType must be 'behavioral' or 'physiological', severity must be 'mild', 'moderate', or 'high'.`
          }
        ]
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `STRESS DETECTION & RESPONSE PROTOCOL\n\nTrigger: ${triggerType} (${severity})\n\nDetection Indicators:\n${protocol.detection.map(d => `- ${d}`).join('\n')}\n\nResponse Actions:\n${protocol.response.map(r => `- ${r}`).join('\n')}\n\nImplementation Code:\n\`\`\`typescript${protocol.code}\n\`\`\`\n\nKey Principles:\n- Child safety is paramount\n- Recovery before continuation\n- Positive framing of all interventions\n- Parent notification for high-stress events\n- Learning from stress patterns to prevent future episodes`
        }
      ]
    };
  }

  private async generateEngagementActivity(args: any) {
    const { phoneme, theme, inputMethods, stressLevel = 'low' } = args;
    
    const themes = {
      dragons: {
        setting: 'Ancient dragon linguistics academy',
        character: 'Dragon language expert',
        motivation: 'Decode ancient dragon communication patterns',
        language: 'mystical, adventurous'
      },
      space: {
        setting: 'Deep space communication center',
        character: 'Alien linguistics specialist',
        motivation: 'Establish first contact through sound patterns',
        language: 'scientific, exploratory'
      },
      magic: {
        setting: 'Academy of magical linguistics',
        character: 'Spell-sound researcher',
        motivation: 'Master sound frequencies for spell casting',
        language: 'mystical, scholarly'
      },
      animals: {
        setting: 'Wildlife communication research station',
        character: 'Animal language expert',
        motivation: 'Decode animal communication systems',
        language: 'naturalistic, caring'
      },
      adventure: {
        setting: 'Remote expedition base camp',
        character: 'Expedition leader',
        motivation: 'Navigate using ancient symbol systems',
        language: 'adventurous but mature'
      },
      mystery: {
        setting: 'International detective agency',
        character: 'Senior investigator partner',
        motivation: 'Crack coded messages in ongoing cases',
        language: 'professional, investigative'
      }
    };

    const selectedTheme = themes[theme as keyof typeof themes];
    const complexity = stressLevel === 'high' ? 'simple' : stressLevel === 'medium' ? 'moderate' : 'rich';
    
    const activity: any = {
      story: {
        setting: selectedTheme.setting,
        character: selectedTheme.character,
        hook: `${selectedTheme.motivation} by analyzing the /${phoneme}/ sound frequency`,
        complexity: complexity,
        ageAppropriate: 'Designed for 12-year-old with foundational skill needs',
        languageStyle: selectedTheme.language
      },
      interactions: {} as any,
      engagement: {
        intrinsicMotivators: [
          'Curiosity about story outcome',
          'Helping character achieve goal',
          'Exploring new story elements',
          'Creating personalized content'
        ],
        avoidedExtrinsics: [
          'No time pressure',
          'No scoring/grading',
          'No comparison to others',
          'No failure states'
        ]
      }
    };

    // Add device-specific interactions with age-appropriate language
    if (inputMethods.includes('touch')) {
      activity.interactions.touch = {
        symbolTracing: `Calibrate symbol recognition by tracing the /${phoneme}/ pattern`,
        systemNavigation: `Navigate interface elements to analyze communication data`,
        patternMatching: `Connect symbol fragments using precise touch coordination`,
        frequencyTuning: `Adjust audio frequencies through touch interface controls`
      };
    }

    if (inputMethods.includes('voice')) {
      activity.interactions.voice = {
        frequencyAnalysis: `Produce /${phoneme}/ sound to match detected frequency patterns`,
        voiceAuthentication: `Voice recognition system requires clear pronunciation`,
        communicationProtocol: `Establish contact using proper sound frequencies`,
        audioTesting: `Test voice clarity for communication system compatibility`
      };
    }

    if (inputMethods.includes('camera')) {
      activity.interactions.camera = {
        symbolDocumentation: `Document real-world examples of symbolic patterns`,
        fieldResearch: `Capture evidence of /${phoneme}/ symbols in environment`,
        progressArchiving: `Create visual record of decoding achievements`,
        evidenceCollection: `Photograph discoveries for case documentation`
      };
    }

    if (inputMethods.includes('microphone')) {
      activity.interactions.microphone = {
        frequencyRecording: `Record voice patterns for system analysis`,
        audioCustomization: `Personalize communication system voice settings`,
        soundEngineering: `Create audio profiles for different scenarios`,
        breathingCalibration: `Calibrate focus enhancement through breathing patterns`
      };
    }

    if (inputMethods.includes('bluetooth')) {
      activity.interactions.bluetooth = {
        deviceSync: `Connect with specialized learning devices`,
        dataSharing: `Share progress with research team`,
        collaborativeMode: `Work with other researchers remotely`
      };
    }

    // Stress-level adaptations with age-appropriate language
    if (stressLevel === 'high') {
      activity.stressAdaptations = {
        simplifiedInterface: 'Reduce cognitive load with cleaner interface design',
        mentorSupport: 'Expert mentor provides additional guidance and encouragement',
        focusEnhancement: 'Activate concentration support systems and calming protocols',
        autonomousControl: 'Full user control over pacing and session management'
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `AGE-APPROPRIATE ENGAGEMENT ACTIVITY (Age 12, Foundational Skills)\n\nPhoneme: /${phoneme}/\nTheme: ${theme}\nStress Level: ${stressLevel}\n\nStory Framework:\n${JSON.stringify(activity.story, null, 2)}\n\nAge-Appropriate Interactions:\n${JSON.stringify(activity.interactions, null, 2)}\n\nEngagement Strategy:\n${JSON.stringify(activity.engagement, null, 2)}\n\n${stressLevel === 'high' ? `Stress Adaptations:\n${JSON.stringify(activity.stressAdaptations, null, 2)}\n\n` : ''}DIGNITY-PRESERVING DESIGN:\n- Language treats user as capable young adult\n- Context provides sophisticated framework for basic skills\n- Visual design avoids childish aesthetics\n- Peer interaction safe (looks like advanced training)\n- Self-concept protected through expert apprentice role\n\nDEVELOPMENTAL APPROPRIATENESS:\n- Acknowledges 12-year-old cognitive abilities\n- Respects emotional maturity needs  \n- Provides foundation skills without shame\n- Maintains social dignity with peers/family\n- Future-oriented (builds toward advanced abilities)`
        }
      ]
    };
  }

  private async validateEngagementSafety(args: any) {
    const { mechanic, context = '' } = args;
    
    const redFlags = [
      'score', 'points', 'leaderboard', 'competition', 'timer', 'deadline',
      'fail', 'lose', 'wrong', 'mistake', 'try again', 'beat', 'win',
      'achievement', 'badge', 'unlock', 'earn', 'reward points'
    ];
    
    const safeAlternatives = [
      'progress', 'growth', 'discovery', 'exploration', 'help', 'support',
      'learn', 'practice', 'try', 'explore', 'discover', 'create'
    ];
    
    const issues: string[] = [];
    const recommendations: string[] = [];
    const mechanicLower = mechanic.toLowerCase();
    
    // Check for problematic engagement patterns
    redFlags.forEach(flag => {
      if (mechanicLower.includes(flag)) {
        issues.push(`Contains potentially pressuring element: "${flag}"`);
      }
    });
    
    // Check for extrinsic motivators
    if (mechanicLower.includes('reward') || mechanicLower.includes('prize')) {
      issues.push('Uses extrinsic rewards which may undermine intrinsic motivation');
      recommendations.push('Focus on intrinsic motivators: curiosity, mastery, autonomy, purpose');
    }
    
    // Check for comparison-based elements
    if (mechanicLower.includes('compare') || mechanicLower.includes('better than')) {
      issues.push('Includes comparison which can trigger shame in struggling readers');
      recommendations.push('Focus on individual growth and personal achievement');
    }
    
    // Check for time pressure
    if (mechanicLower.includes('time') || mechanicLower.includes('speed') || mechanicLower.includes('fast')) {
      issues.push('May create time pressure which causes stress in dyslexic learners');
      recommendations.push('Remove time elements or make them invisible/optional');
    }
    
    // Positive recommendations
    if (issues.length === 0) {
      recommendations.push('Consider adding story elements that create emotional investment');
      recommendations.push('Ensure child has agency and control over the experience');
      recommendations.push('Connect to helping others or solving meaningful problems');
    }
    
    const isSafe = issues.length === 0;
    
    return {
      content: [
        {
          type: 'text',
          text: `ENGAGEMENT SAFETY VALIDATION\n\nMechanic: "${mechanic}"\nContext: ${context}\n\n${isSafe ? '✅ TRAUMA-SAFE ENGAGEMENT' : '⚠️ POTENTIAL ISSUES DETECTED'}\n\n${issues.length > 0 ? `Issues Found:\n${issues.map(i => `- ${i}`).join('\n')}\n\n` : ''}Recommendations:\n${recommendations.map(r => `- ${r}`).join('\n')}\n\nSafe Engagement Principles:\n- Intrinsic motivation (curiosity, mastery, purpose)\n- Child agency and control\n- No performance pressure or comparison\n- Story-driven emotional investment\n- Multiple pathways to success\n- Celebration of effort over accuracy\n\nTrauma-Informed Alternatives:\n${safeAlternatives.map(alt => `- Use "${alt}" instead of pressure-based language`).join('\n')}`
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Semesters Development MCP Server running on stdio');
  }
}

const server = new SemestersMCP();
server.run().catch(console.error);

