#!/usr/bin/env node

/**
 * Test script for Semesters MCP Server tools
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = join(__dirname, 'dist', 'index.js');

// Test cases for each tool
const testCases = [
  {
    name: 'List Tools',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    }
  },
  {
    name: 'Generate Dyslexia UI Button',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'generate_dyslexia_ui',
        arguments: {
          componentType: 'button',
          content: 'Practice Sounds',
          intent: 'primary'
        }
      }
    }
  },
  {
    name: 'Review Trauma Content',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'review_trauma_content',
        arguments: {
          content: 'You got that wrong! Try again.',
          context: 'feedback message'
        }
      }
    }
  },
  {
    name: 'Generate Phoneme Activity',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'generate_phoneme_activity',
        arguments: {
          phoneme: 'a',
          modalities: ['visual', 'auditory', 'kinesthetic']
        }
      }
    }
  },
  {
    name: 'Validate Engagement Safety',
    request: {
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'validate_engagement_safety',
        arguments: {
          mechanic: 'Timer-based challenges with leaderboard scoring',
          context: 'phoneme practice game'
        }
      }
    }
  }
];

async function runTest(testCase) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log(`📤 Request: ${JSON.stringify(testCase.request, null, 2)}`);
    
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let errorOutput = '';
    
    server.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    server.on('close', (code) => {
      if (code === 0) {
        try {
          const response = JSON.parse(output.trim());
          console.log(`✅ Response: ${JSON.stringify(response, null, 2)}`);
          resolve(response);
        } catch (e) {
          console.log(`⚠️  Raw output: ${output}`);
          resolve({ raw: output });
        }
      } else {
        console.log(`❌ Error (code ${code}): ${errorOutput}`);
        reject(new Error(`Process exited with code ${code}`));
      }
    });
    
    // Send the request
    server.stdin.write(JSON.stringify(testCase.request) + '\n');
    server.stdin.end();
  });
}

async function runAllTests() {
  console.log('🚀 Starting MCP Server Tool Tests\n');
  
  for (const testCase of testCases) {
    try {
      await runTest(testCase);
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between tests
    } catch (error) {
      console.error(`❌ Test failed: ${testCase.name}`, error.message);
    }
  }
  
  console.log('\n✨ All tests completed!');
}

runAllTests().catch(console.error);
