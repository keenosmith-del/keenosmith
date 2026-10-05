import { Zap } from 'lucide-react';

export default function RecruiterMetadata() {
    return <div className="recruiter-system-metadata">
        <div className="recruiter-system-line">
            <Zap size={10} aria-hidden="true" />
            <span>Powered by my own Hybrid Intelligence system · <strong>KAILOR</strong></span>
        </div>
        <div className="recruiter-system-secondary">Built and designed by Keeno Smith © September 2026</div>
    </div>;
}
