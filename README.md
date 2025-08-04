# Semesters MCP Server

A specialized Model Context Protocol (MCP) server for building trauma-informed, dyslexia-friendly educational software. This server provides AI assistants with specialized tools for creating accessible learning applications that follow evidence-based educational methodologies.

## Features

- **Dyslexia-Friendly UI Generation**: Creates accessible components with OpenDyslexic fonts and high contrast
- **Trauma-Informed Content Review**: Validates content against trauma-informed principles
- **Orton-Gillingham Activity Validation**: Ensures activities follow OG methodology
- **Multisensory Phoneme Activities**: Generates activities using multiple learning modalities
- **Code Safety Review**: Reviews code for trauma-informed principles
- **Stress Detection Protocols**: Generates protocols for handling learner stress
- **Engagement Activities**: Creates intrinsically motivating learning experiences
- **Safety Validation**: Checks engagement mechanics for potential trauma triggers

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TypeScript 5.0+

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd semesters-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

### MCP Configuration

To use this server with an MCP client (like Claude Desktop), add the following to your MCP configuration file:

```json
{
  "mcpServers": {
    "semesters-dev": {
      "command": "node",
      "args": ["path/to/semesters-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

Replace `path/to/semesters-mcp-server` with the actual path to your installation.

## Usage

The server runs via stdio and provides 8 specialized tools for educational software development:

1. `generate_dyslexia_ui` - Generate accessible UI components
2. `review_trauma_content` - Review content for trauma-informed language
3. `validate_og_activity` - Validate against Orton-Gillingham principles
4. `generate_phoneme_activity` - Create multisensory phoneme practice
5. `review_code_safety` - Review code for trauma-informed principles
6. `generate_stress_protocol` - Create stress detection/response protocols
7. `generate_engagement_activity` - Create intrinsically motivating activities
8. `validate_engagement_safety` - Check engagement mechanics for safety

## Development

```bash
npm run dev    # Watch mode for development
npm run build  # Build TypeScript to JavaScript
npm start      # Run the built server
npm run clean  # Clean build directory
```

### Testing

The project includes a comprehensive test suite that exercises all available tools:

```bash
# Run the test suite
node test-tools.js
```

The test script will:
- List all available tools
- Test each tool with sample inputs
- Validate responses and error handling
- Provide detailed output for debugging

## API Reference

### Tool Parameters

#### `generate_dyslexia_ui`
- `componentType`: "button" | "text" | "input" | "card"
- `content`: String content for the component
- `intent`: "primary" | "secondary" | "comfort" | "celebration"

#### `review_trauma_content`
- `content`: Text content to review
- `context`: Optional context where content appears

#### `validate_og_activity`
- `activity`: Activity object to validate
- `targetLevel`: Target OG level (1-5)

#### `generate_phoneme_activity`
- `phoneme`: Target phoneme to practice
- `modalities`: Array of "visual" | "auditory" | "kinesthetic" | "tactile"

#### `review_code_safety`
- `code`: Code to review
- `language`: Programming language

#### `generate_stress_protocol`
- `triggerType`: "behavioral" | "physiological" | "performance"
- `severity`: "mild" | "moderate" | "high"

#### `generate_engagement_activity`
- `phoneme`: Target phoneme to practice
- `theme`: "dragons" | "space" | "magic" | "animals" | "adventure" | "mystery"
- `stressLevel`: "low" | "medium" | "high"
- `inputMethods`: Array of "touch" | "voice" | "camera" | "microphone" | "bluetooth"

#### `validate_engagement_safety`
- `mechanic`: Engagement mechanic to validate
- `context`: Context where mechanic would be used

## Educational Principles

- **Trauma-Informed**: No failure states, child agency, positive reinforcement
- **Dyslexia-Friendly**: OpenDyslexic fonts, high contrast, generous spacing
- **Orton-Gillingham**: Systematic, multisensory, sequential phonics instruction
- **Age-Appropriate**: Sophisticated contexts for foundational skills (12+ years)

## Technical Details

- **Runtime**: Node.js with ES modules
- **Language**: TypeScript 5.0+
- **Protocol**: Model Context Protocol (MCP) via stdio
- **Dependencies**: @modelcontextprotocol/sdk
- **Architecture**: Single-file server with modular tool handlers

## Contributing

When contributing to this project, please ensure:

1. All code follows trauma-informed principles
2. UI components are dyslexia-friendly
3. Educational content aligns with Orton-Gillingham methodology
4. Test coverage is maintained for new tools
5. Documentation is updated for API changes

## License

MIT License - see package.json for details
