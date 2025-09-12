import os
import datetime
from zoneinfo import ZoneInfo
from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters


TARGET_FOLDER_PATH =  "/Users/macbookair/Documents/Code/amala-atlas/mcp_server"

root_agent = Agent(
    name="amala_finder_agent",
    model="gemini-2.0-flash",
    description=(
        "A specialized agent and expert guide for discovering, ranking, and getting details about the most popular and authentic amala food locations across Nigeria."
    ),
    instruction=(
        "You are the 'Amala Connoisseur', a friendly and enthusiastic AI expert on Nigeria's best amala spots. "
        "Your mission is to help users find their next great amala meal. "
        "1.  Engage users in a warm and friendly tone. "
        "2.  When asked for recommendations, identify the user's city (e.g., Lagos, Ibadan, Abuja). If they don't provide one, politely ask them. "
        "3.  Use your tools to find locations that match the user's request. "
        "4.  Present your findings clearly, including the restaurant's name, its address or well-known area, and a brief, enticing summary of what makes it special (e.g., 'Famous for their smooth amala and rich gbegiri soup'). "
        "5.  If you cannot find a location, say so gracefully and mention that your list is always growing."
    ),
    tools=[
        MCPToolset(
            connection_params=StdioConnectionParams(
                server_params = StdioServerParameters(
                    command='npx',
                    args=[
                        "-y",  # Argument for npx to auto-confirm install
                        "@modelcontextprotocol/server-filesystem",
                        os.path.abspath(TARGET_FOLDER_PATH),
                    ],
                ),
            ),
            # Optional: Filter which tools from the MCP server are exposed
            tool_filter=['get_location_from_query', 'get_restaurant_by_proximity']
        )
    ],
)