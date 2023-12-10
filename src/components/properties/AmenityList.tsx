import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

export interface Amenity {
  name: string;
  id?: number;
  description?: string;
  type?: string;
}

interface AmenityListProps {
  onChange: (amenities: string[]) => void;
}

const AmenityList: React.FC<AmenityListProps> = ({ onChange }) => {
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleAddAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) return;
    const updatedAmenities = [...amenities, amenity];
    setAmenities(updatedAmenities);
    onChange(updatedAmenities);
  };

  const handleRemoveAmenity = (amenity: string) => {
    const updatedAmenities = amenities.filter((item) => item !== amenity);
    setAmenities(updatedAmenities);
    onChange(updatedAmenities);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Add amenity"
      value={amenities}
      onChange={(selectedAmenities: string[]) => {
        setAmenities(selectedAmenities);
        onChange(selectedAmenities);
      }}
      onBlur={() => setAmenities((prev) => [...prev])} // To trigger onBlur event
    >
      {amenities.map((amenity) => (
        <Option key={amenity} value={amenity}>
          {amenity}
        </Option>
      ))}
    </Select>
  );
};

export default AmenityList;
