import raw from "@/data/simple.json";
import { buildManyVega } from "@/lib/vega/buildVega";
import VegaView from "@/components/vega/VegaView";

export default function TestingPage() {
    const specs = buildManyVega(raw);

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            {specs.map((spec, i) => (
                <VegaView key={i} spec={spec}/>
            ))}
        </div>
    );
}
