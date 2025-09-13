// app/components/AddRestaurantModal.tsx
import React, { useState } from "react";
import LocationAutocomplete from "@/components/local/LocationAutocomplete";
import { MockPlace } from "@/lib/types";

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<MockPlace>) => void;
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<Partial<MockPlace>>({});
  const [selectedLocation, setSelectedLocation] = useState<{ description: string; place_id: string } | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-md shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Add New Amala Spot</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const openHours = `${form.openHour || ""}${form.openPeriod ? ` ${form.openPeriod.toLowerCase()}` : ""} - ${form.closeHour || ""}${form.closePeriod ? ` ${form.closePeriod.toLowerCase()}` : ""}`;
            onSubmit({ ...form, openHours });
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full bg-[#0A0A0A] text-white px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-lime-500"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <LocationAutocomplete
            onSelect={async (loc) => {
              setSelectedLocation(loc);
              setForm((f) => ({ ...f, address: loc.description }));
              const res = await fetch(`/api/place-details?place_id=${loc.place_id}`);
              const details = await res.json();
              if (details.result) {
                let city = "";
                let country = "";
                const comps = details.result.address_components || [];
                comps.forEach((c: any) => {
                  if (c.types.includes("locality")) city = c.long_name;
                  if (c.types.includes("country")) country = c.long_name;
                });
                const lat = details.result.geometry?.location?.lat;
                const lng = details.result.geometry?.location?.lng;
                setForm((f) => ({ ...f, city, country, lat, lng }));
              }
            }}
          />
          {selectedLocation && (
            <div className="text-xs text-gray-400">Selected: {selectedLocation.description}</div>
          )}
          <input
            type="text"
            placeholder="City"
            required
            className="w-full bg-[#0A0A0A] text-white px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-lime-500"
            value={form.city || ""}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Country"
            required
            className="w-full bg-[#0A0A0A] text-white px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-lime-500"
            value={form.country || ""}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
          />
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-400">Open Hour:</label>
            <select
              className="bg-[#0A0A0A] text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-lime-500"
              value={form.openHour || ""}
              onChange={(e) => setForm((f) => ({ ...f, openHour: e.target.value }))}
              required
            >
              <option value="">Hour</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              className="bg-[#0A0A0A] text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-lime-500"
              value={form.openPeriod || "AM"}
              onChange={(e) => setForm((f) => ({ ...f, openPeriod: e.target.value as "AM" | "PM" }))}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-400">Close Hour:</label>
            <select
              className="bg-[#0A0A0A] text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-lime-500"
              value={form.closeHour || ""}
              onChange={(e) => setForm((f) => ({ ...f, closeHour: e.target.value }))}
              required
            >
              <option value="">Hour</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              className="bg-[#0A0A0A] text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-lime-500"
              value={form.closePeriod || "PM"}
              onChange={(e) => setForm((f) => ({ ...f, closePeriod: e.target.value as "AM" | "PM" }))}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-lime-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantModal;