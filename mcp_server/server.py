"""

"""
from typing import List, TypedDict
from mcp.server.fastmcp import FastMCP
from geopy.geocoders import Nominatim

class Restaurant(TypedDict):
    name: str
    location: str
    summary: str
    reviewers: int

class Location(TypedDict):
    latitude: float
    longitude: float

# Create an MCP server
mcp = FastMCP("AmalaServer")

# Instantiate a new Nominatim client
geolocator = Nominatim(user_agent="amala_atlas_agent")


# tool to get location from users query
@mcp.tool()
def get_location_from_query(query: str) -> Location:
    """
    Extracts geographic coordinates (latitude and longitude) from a user query by identifying a location name within it.

    Args:
        query (str): The user query string, e.g., "amala spots near Anthony, Lagos".

    Returns:
        dict: A dictionary containing the 'latitude' and 'longitude' of the found location.
              Returns None for both keys if no location could be determined or if an error occurred.
    """
    try:
        location = geolocator.geocode(query, exactly_one=True, country_codes="NG")
        if location:
            print(f"Geocoding successful for query '{query}': Found {location.address}")
            return {
                "latitude": location.latitude,
                "longitude": location.longitude
            }
        else:
            return {
                "latitude": None,
                "longitude": None
            }
    except Exception as e:
        print(f"An unexpected error occurred for query '{query}': {e}")
        return {
            "latitude": None,
            "longitude": None,
        }
    

@mcp.tool()
def get_restaurant_by_proximity(lat: float, lon: float) -> List[Restaurant]:
    """Fetch restaurant locations based on proximity to given latitude and longitude
    Args: 
        lat (float): Latitude of the user's location
        lon (float): Longitude of the user's location
    Returns: 
        List[Restaurant]: A list of restaurants near the given location
    """
    return [
        { 
            "name": "Ya Koyo",
            "location": "Anthony Village Road, Anthony, Lagos",
            "summary": "One-stop shop for the best amala and gbegiri in Anthony area.",
            "reviewers": 56
        }
    ]


# resource that gets amala restaurants
@mcp.resource("restaurants://all")
def get_restaurants() -> List[Restaurant]:
    """Get a list of restaurants in a specific location"""
    return [       
        { 
            "name": "",
            "location": "",
            "summary": "",
            "reviewers": 0
        }
    ]


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')