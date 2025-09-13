from dotenv import load_dotenv
load_dotenv()

import os
import json
from typing import List, Optional, TypedDict
from mcp.server.fastmcp import FastMCP
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
import googlemaps

class Restaurant(TypedDict):
    name: str
    location: str
    summary: str
    reviewers: int

class Location(TypedDict):
    latitude: Optional[float]
    longitude: Optional[float]

# Create an MCP server
mcp = FastMCP("AmalaServer")

try:
    gmaps = googlemaps.Client(key=os.environ.get("GOOGLE_MAPS_API_KEY"))
except Exception as e:
    print(f"Could not initialize Google Maps client: {e}")
    print("Please make sure your GOOGLE_MAPS_API_KEY environment variable is set.")
    gmaps = None

# Instantiate a new Nominatim client
geolocator = Nominatim(user_agent="amala_atlas_agent")

CACHE_FILE_PATH = "restaurants_cache.json"
SEARCH_RADIUS_METERS = 5000  # 5 kilometers

@mcp.tool()
def get_coordinates_from_query(location: str) -> dict | None:
    """
    Returns geographic coordinates.

    Args:
        location (str): The user's specific location name (e.g., "Ikeja, Lagos").

    Returns:
        dict | None: A dictionary with 'latitude' and 'longitude', or None on failure.
    """
    try:
        location_data = geolocator.geocode(location, country_codes="NG", timeout=10)

        if location_data:
            print(f"Successfully geocoded '{location}': Found {location_data.address}")
            return {
                "latitude": location_data.latitude,
                "longitude": location_data.longitude
            }
        else:
            print(f"Could not geocode '{location}'.")
            return None

    except (GeocoderTimedOut, GeocoderUnavailable) as e:
        print(f"Geocoding service error for '{location}': {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred while geocoding '{location}': {e}")
        return None

@mcp.tool()
def find_amala_restaurants(lat: float, lon: float) -> List[Restaurant]:
    """
    Finds Amala restaurants near a given latitude and longitude.
    It first checks a local cache, and if no results are found,
    it searches Google Maps and updates the cache.

    Args:
        lat (float): Latitude of the user's location.
        lon (float): Longitude of the user's location.

    Returns:
        List[Restaurant]: A list of restaurants near the given location.
    """
    user_location = (lat, lon)
    
    # --- Step 1 & 2: Load cache and check for nearby restaurants ---
    try:
        with open(CACHE_FILE_PATH, "r") as f:
            cached_restaurants = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        cached_restaurants = {}

    nearby_from_cache = []
    for place_id, restaurant in cached_restaurants.items():
        restaurant_location = (restaurant['latitude'], restaurant['longitude'])
        distance = great_circle(user_location, restaurant_location).meters
        if distance <= SEARCH_RADIUS_METERS:
            nearby_from_cache.append(restaurant)
    
    # --- Step 3: Return from cache if found ---
    if nearby_from_cache:
        print(f"Found {len(nearby_from_cache)} restaurants in cache for location ({lat}, {lon}).")
        return nearby_from_cache

    # --- Step 4: Fetch from Google Maps if not in cache ---
    print(f"No results in cache. Searching Google Maps for location ({lat}, {lon}).")
    if not gmaps:
        return [{"name": "Error", "location": "Google Maps client not configured.", "summary": "Please check API key.", "reviewers": 0}]

    try:
        places_result = gmaps.places_nearby(
            location=user_location,
            radius=SEARCH_RADIUS_METERS,
            keyword="amala restaurant",
            language="en"
        )
    except Exception as e:
        print(f"An error occurred with the Google Maps API: {e}")
        return []

    # --- Step 5 & 6: Update cache and return new results ---
    newly_found_restaurants = []
    for place in places_result.get('results', []):
        place_id = place['place_id']
        new_restaurant = {
            "name": place['name'],
            "location": place['vicinity'],
            "summary": f"A spot with a user rating of {place.get('rating', 'N/A')} out of 5.",
            "reviewers": place.get('user_ratings_total', 0),
            "latitude": place['geometry']['location']['lat'],
            "longitude": place['geometry']['location']['lng'],
        }
        # Add to our cache and to the list to be returned
        cached_restaurants[place_id] = new_restaurant
        newly_found_restaurants.append(new_restaurant)

    with open(CACHE_FILE_PATH, "w") as f:
        json.dump(cached_restaurants, f, indent=4)
        
    print(f"Found {len(newly_found_restaurants)} new restaurants and updated cache.")
    return newly_found_restaurants

@mcp.resource("restaurants://all")
def get_restaurants() -> List[Restaurant]:
    """
    Retrieves a complete list of ALL amala restaurants that have been previously
    discovered and saved in the local cache.

    Returns:
        List[Restaurant]: A list of all known restaurants.
    """
    try:
        with open(CACHE_FILE_PATH, "r") as f:
            # The cache is a dictionary with place_ids as keys.
            # We just need to return the values as a list.
            cached_restaurants = json.load(f)
            print(f"Loaded {len(cached_restaurants)} restaurants from the cache resource.")
            return list(cached_restaurants.values())
    except (FileNotFoundError, json.JSONDecodeError):
        # If the cache file doesn't exist or is empty/invalid, return an empty list.
        print("Cache file not found or is empty. Returning no restaurants for the resource.")
        return []


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')