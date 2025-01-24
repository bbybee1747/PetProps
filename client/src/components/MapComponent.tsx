import { APIProvider, Map } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
}

const MapComponent = ({ center }: MapComponentProps) => (
  <APIProvider apiKey={import.meta.env.GEO_API_KEY || ""}>
    <Map zoom={12} center={center} style={{ width: "100%", height: "400px" }} />
  </APIProvider>
);

export default MapComponent;
