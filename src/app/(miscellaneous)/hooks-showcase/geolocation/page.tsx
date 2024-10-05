import { HooksShowcaseWrapper } from "../_components/hooks-showcase-wrapper";
import GeolocationUI from "./_components/geolocation-showcase";

export default function GeolocationDemo() {
    return (
        <HooksShowcaseWrapper
            title="Geolocation Hook"
            description="A custom hook for accessing geolocation data. This hook provides real-time geolocation data, including latitude, longitude, accuracy, and more.
"
            codeString={`const { data, error, isLoading } = useGeolocation()`}
            fileName="useGeolocation.ts"
            language="typescript"
            demoComponent={<GeolocationUI />}
        >
        </HooksShowcaseWrapper>
    )
}
