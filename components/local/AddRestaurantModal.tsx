import LocationAutocomplete from "@/app/components/local/LocationAutocomplete";
import { Restaurant } from "@/lib/types";
import React, { useState } from "react";

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Restaurant>) => void;
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [selectedLocation, setSelectedLocation] = useState<{ description: string; place_id: string } | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Amala Spot</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            // Combine open/close hour and period into openHours string
            const openHours = `${form.openHour || ""}${form.openPeriod ? form.openPeriod.toLowerCase() : ""} - ${form.closeHour || ""}${form.closePeriod ? form.closePeriod.toLowerCase() : ""}`;
            onSubmit({
              ...form,
              openHours,
            });
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="border rounded px-3 py-2"
            value={form.name || ""}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          {/* Location Autocomplete for address */}
          <LocationAutocomplete
            onSelect={async loc => {
              setSelectedLocation(loc);
              setForm(f => ({ ...f, address: loc.description }));
              // Fetch place details for autofill
              const res = await fetch(`/api/place-details?place_id=${loc.place_id}`);
              const details = await res.json();
              if (details.result) {
                // Extract city, country, lat, lng
                let city = "";
                let country = "";
                const comps = details.result.address_components || [];
                comps.forEach((c: any) => {
                  if (c.types.includes("locality")) city = c.long_name;
                  if (c.types.includes("country")) country = c.long_name;
                });
                const lat = details.result.geometry?.location?.lat;
                const lng = details.result.geometry?.location?.lng;
                setForm(f => ({
                  ...f,
                  city,
                  country,
                  lat,
                  lng,
                }));
              }
            }}
          />
          {/* Optionally show selected location */}
          {selectedLocation && (
            <div className="text-xs text-gray-500">Selected: {selectedLocation.description}</div>
          )}
          <input
            type="text"
            placeholder="City"
            required
            className="border rounded px-3 py-2"
            value={form.city || ""}
            onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Country"
            required
            className="border rounded px-3 py-2"
            value={form.country || ""}
            onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
          />
          {/* Open Hour */}
          <div className="flex gap-2 items-center">
            <label className="text-sm">Open Hour:</label>
            <select
              className="border rounded px-2 py-1"
              value={form.openHour || ""}
              onChange={e => setForm(f => ({ ...f, openHour: e.target.value }))}
              required
            >
              <option value="">Hour</option>
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <select
              className="border rounded px-2 py-1"
              value={form.openPeriod || "AM"}
              onChange={e => setForm(f => ({ ...f, openPeriod: e.target.value as "AM" | "PM" }))}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {/* Close Hour */}
          <div className="flex gap-2 items-center">
            <label className="text-sm">Close Hour:</label>
            <select
              className="border rounded px-2 py-1"
              value={form.closeHour || ""}
              onChange={e => setForm(f => ({ ...f, closeHour: e.target.value }))}
              required
            >
              <option value="">Hour</option>
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <select
              className="border rounded px-2 py-1"
              value={form.closePeriod || "PM"}
              onChange={e => setForm(f => ({ ...f, closePeriod: e.target.value as "AM" | "PM" }))}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {/* Photo upload/camera to be added later */}
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">Submit</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
