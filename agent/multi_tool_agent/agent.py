import os
import datetime
from zoneinfo import ZoneInfo
from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters


TARGET_FOLDER_PATH =  "/Users/macbookair/Documents/Code/amala-atlas/mcp_server/server.py"

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
        "2.  First, determine the user's target location from their query (e.g., 'Hounslow', 'Ikeja, Lagos'). If they don't provide one, politely ask for it. "
        "3.  Once you have a location, execute a two-step process to find restaurants:"
        "    - **Step A:** Use the `get_coordinates_from_query` tool to convert the location name into precise latitude and longitude."
        "    - **Step B:** Use the `get_restaurant_by_proximity` tool with the latitude and longitude you received from Step A to find the actual restaurants."
        "4.  Present your findings clearly, including the restaurant's name, its address, and an enticing summary.(e.g., 'Famous for their smooth amala and rich gbegiri soup'). "
        "5.  If you cannot find a location, say so gracefully and mention that your list is always growing."
    ),
    tools=[
        MCPToolset(
            connection_params=StdioConnectionParams(
                server_params = StdioServerParameters(
                    command="uv",
                    args=["run", os.path.abspath(TARGET_FOLDER_PATH)],
                ),
            ),
            # Optional: Filter which tools from the MCP server are exposed
            # tool_filter=['get_coordinates_from_query', 'get_restaurant_by_proximity']
        )
    ],
)