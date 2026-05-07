export function PaasIllustration() {
  return (
    <div
      className="project-illustration project-illustration-paas"
      role="img"
      aria-label="PaaS Platform deployment architecture illustration"
      dangerouslySetInnerHTML={{
        __html: `
<div class="project-illustration-scene">
  <svg width="100%" viewBox="58 18 524 432" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="paas-dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".8" fill="#1C1C1C"/>
      </pattern>
    </defs>
    <rect width="640" height="460" fill="url(#paas-dots)"/>
    <g class="anim-a">
      <rect x="60" y="20" width="110" height="44" rx="6" fill="#0E0E0E" stroke="#1E1E1E" stroke-width="1"/>
      <text class="mono" x="115" y="38" text-anchor="middle" font-size="14" fill="#3B82F6" letter-spacing=".1em">GITHUB</text>
      <text class="sans" x="115" y="54" text-anchor="middle" font-size="14" fill="#CCC" font-weight="400">git push</text>
    </g>
    <g class="anim-a">
      <rect x="200" y="20" width="110" height="44" rx="6" fill="#0E0E0E" stroke="#252525" stroke-width="1"/>
      <text class="mono" x="255" y="38" text-anchor="middle" font-size="14" fill="#555" letter-spacing=".1em">PR PREVIEW</text>
      <text class="sans" x="255" y="54" text-anchor="middle" font-size="14" fill="#888" font-weight="400">pr-42</text>
    </g>
    <line class="fl-b gp" x1="170" y1="42" x2="199" y2="42" stroke="#3B82F6" stroke-width="1.2"/>
    <line x1="255" y1="64" x2="255" y2="94" stroke="#252525" stroke-width="1" stroke-dasharray="2 3"/>

    <g class="anim-a">
      <rect x="60" y="94" width="520" height="56" rx="8" fill="#0B0B0B" stroke="#1C1C1C" stroke-width="1"/>
      <rect x="60" y="94" width="520" height="4" rx="0" fill="#1A1A2E" opacity=".8"/>
      <rect x="60" y="94" width="520" height="4" rx="8" fill="#1D3461" opacity=".5"/>
      <text class="mono" x="80" y="113" font-size="14" fill="#1E40AF" letter-spacing=".1em">CONTROL PLANE</text>
      <rect x="80" y="120" width="60" height="20" rx="3" fill="#111" stroke="#222" stroke-width=".5"/>
      <text class="mono" x="110" y="133" text-anchor="middle" font-size="14" fill="#555">Next.js</text>
      <rect x="148" y="120" width="56" height="20" rx="3" fill="#111" stroke="#222" stroke-width=".5"/>
      <text class="mono" x="176" y="133" text-anchor="middle" font-size="14" fill="#555">Web UI</text>
      <rect x="212" y="120" width="68" height="20" rx="3" fill="#111" stroke="#222" stroke-width=".5"/>
      <text class="mono" x="246" y="133" text-anchor="middle" font-size="14" fill="#555">REST API</text>
      <rect x="472" y="120" width="92" height="20" rx="3" fill="#0D1117" stroke="#1E3A5F" stroke-width=".5"/>
      <text class="mono" x="518" y="133" text-anchor="middle" font-size="14" fill="#2563EB">PostgreSQL</text>
    </g>
    <line x1="320" y1="150" x2="320" y2="178" stroke="#1A1A1A" stroke-width="1" stroke-dasharray="2 3"/>
    <line class="fl-g gp" x1="200" y1="150" x2="200" y2="178" stroke="#16A34A" stroke-width="1.2"/>

    <g class="anim-a">
      <rect x="60" y="178" width="380" height="56" rx="8" fill="#0B0B0B" stroke="#1C1C1C" stroke-width="1"/>
      <text class="mono" x="80" y="197" font-size="14" fill="#15803D" letter-spacing=".1em">WORKER - NODE.JS</text>
      <rect x="80" y="203" width="52" height="22" rx="3" fill="#111" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="106" y="217" text-anchor="middle" font-size="14" fill="#666">build</text>
      <rect x="140" y="203" width="52" height="22" rx="3" fill="#111" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="166" y="217" text-anchor="middle" font-size="14" fill="#666">deploy</text>
      <rect x="200" y="203" width="52" height="22" rx="3" fill="#111" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="226" y="217" text-anchor="middle" font-size="14" fill="#666">provision</text>
      <rect x="260" y="203" width="60" height="22" rx="3" fill="#0A2A12" stroke="#15803D" stroke-width=".8"/>
      <text class="mono" x="290" y="217" text-anchor="middle" font-size="14" fill="#4ADE80">run</text>
      <text class="mono" x="360" y="217" text-anchor="end" font-size="14" fill="#2A2A2A">BullMQ</text>
    </g>
    <g class="anim-a">
      <rect x="456" y="178" width="124" height="56" rx="8" fill="#0B0B0B" stroke="#1C1C1C" stroke-width="1"/>
      <text class="mono" x="518" y="197" text-anchor="middle" font-size="14" fill="#7F1D1D" letter-spacing=".1em">REDIS</text>
      <rect x="490" y="204" width="10" height="24" rx="1" fill="#991B1B" opacity=".5"/>
      <rect x="505" y="208" width="10" height="20" rx="1" fill="#991B1B" opacity=".4"/>
      <rect x="520" y="202" width="10" height="26" rx="1" fill="#B91C1C" opacity=".6"/>
      <rect x="535" y="206" width="10" height="22" rx="1" fill="#991B1B" opacity=".4"/>
    </g>
    <line class="fl-a gp" x1="440" y1="206" x2="455" y2="206" stroke="#DC2626" stroke-width="1"/>
    <line class="fl-a gp" x1="455" y1="218" x2="440" y2="218" stroke="#DC2626" stroke-width="1" style="animation-delay:.4s"/>
    <line class="fl-g gp" x1="200" y1="234" x2="200" y2="266" stroke="#16A34A" stroke-width="1.2"/>

    <g class="anim-a">
      <rect x="60" y="266" width="520" height="80" rx="8" fill="#080808" stroke="#1A3A5C" stroke-width="1"/>
      <rect x="60" y="266" width="520" height="4" rx="8" fill="#1D3461" opacity=".6"/>
      <text class="mono" x="80" y="285" font-size="14" fill="#1E40AF" letter-spacing=".1em">DOCKER ENGINE</text>
      <rect x="80" y="292" width="80" height="44" rx="5" fill="#0D0D0D" stroke="#1C1C1C" stroke-width=".8"/>
      <text class="mono" x="120" y="309" text-anchor="middle" font-size="14" fill="#3B82F6">app</text>
      <text class="mono" x="120" y="325" text-anchor="middle" font-size="14" fill="#333">Node.js</text>
      <rect x="168" y="292" width="108" height="44" rx="5" fill="#071A0E" stroke="#15803D" stroke-width=".8"/>
      <text class="mono" x="222" y="309" text-anchor="middle" font-size="14" fill="#4ADE80">preview/pr-42</text>
      <text class="mono" x="222" y="325" text-anchor="middle" font-size="14" fill="#15803D">auto-deploy</text>
      <rect x="284" y="292" width="72" height="44" rx="5" fill="#0D0D0D" stroke="#1C1C1C" stroke-width=".8"/>
      <text class="mono" x="320" y="309" text-anchor="middle" font-size="14" fill="#666">postgres</text>
      <text class="mono" x="320" y="325" text-anchor="middle" font-size="14" fill="#2A2A2A">managed</text>
      <rect x="364" y="292" width="60" height="44" rx="5" fill="#0D0D0D" stroke="#1C1C1C" stroke-width=".8"/>
      <text class="mono" x="394" y="309" text-anchor="middle" font-size="14" fill="#666">redis</text>
      <text class="mono" x="394" y="325" text-anchor="middle" font-size="14" fill="#2A2A2A">managed</text>
      <rect x="432" y="292" width="56" height="44" rx="5" fill="#0D0D0D" stroke="#1C1C1C" stroke-width=".8"/>
      <text class="mono" x="460" y="309" text-anchor="middle" font-size="14" fill="#666">minio</text>
      <text class="mono" x="460" y="325" text-anchor="middle" font-size="14" fill="#2A2A2A">S3-compat</text>
      <rect x="496" y="292" width="68" height="44" rx="5" fill="#0D0D0D" stroke="#1C1C1C" stroke-width=".8"/>
      <text class="mono" x="530" y="309" text-anchor="middle" font-size="14" fill="#666">mysql</text>
      <text class="mono" x="530" y="325" text-anchor="middle" font-size="14" fill="#2A2A2A">managed</text>
    </g>
    <line x1="320" y1="346" x2="320" y2="372" stroke="#1A1A2E" stroke-width="1" stroke-dasharray="2 3"/>

    <g class="anim-a">
      <rect x="60" y="372" width="520" height="36" rx="6" fill="#09090F" stroke="#1E1B4B" stroke-width="1"/>
      <text class="mono" x="320" y="394" text-anchor="middle" font-size="14" fill="#4F46E5" letter-spacing=".04em">Traefik v3 - auto SSL - subdomain routing - reverse proxy</text>
    </g>
    <line x1="320" y1="408" x2="320" y2="418" stroke="#1A1A1A" stroke-width="1" stroke-dasharray="2 3"/>

    <g class="anim-a">
      <rect x="60" y="418" width="164" height="30" rx="5" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="142" y="436" text-anchor="middle" font-size="14" fill="#333">Prometheus</text>
      <rect x="232" y="418" width="116" height="30" rx="5" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="290" y="436" text-anchor="middle" font-size="14" fill="#333">Loki</text>
      <rect x="356" y="418" width="224" height="30" rx="5" fill="#0A0A0A" stroke="#C2410C" stroke-width=".5" opacity=".9"/>
      <text class="mono" x="468" y="436" text-anchor="middle" font-size="14" fill="#EA580C">Grafana</text>
    </g>
  </svg>
</div>`,
      }}
    />
  );
}

export function PaynowIllustration() {
  return (
    <div
      className="project-illustration project-illustration-paynow"
      role="img"
      aria-label="paynow-react payment flow illustration"
      dangerouslySetInnerHTML={{
        __html: `
<div class="project-illustration-scene">
  <svg width="100%" viewBox="30 38 576 324" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="paynow-dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".8" fill="#141414"/>
      </pattern>
    </defs>
    <rect width="640" height="380" fill="url(#paynow-dots)"/>

    <g class="col">
      <rect x="32" y="40" width="148" height="20" rx="6" fill="#111" stroke="#1A1A1A" stroke-width=".8"/>
      <circle cx="46" cy="50" r="3" fill="#2A2A2A"/>
      <circle cx="57" cy="50" r="3" fill="#2A2A2A"/>
      <circle cx="68" cy="50" r="3" fill="#2A2A2A"/>
      <text class="mono" x="106" y="54" text-anchor="middle" font-size="14" fill="#333">yourapp.com</text>
      <rect x="32" y="60" width="148" height="254" rx="0" fill="#0C0C0C" stroke="#1A1A1A" stroke-width=".8"/>
      <rect x="32" y="60" width="148" height="254" rx="6" fill="none" stroke="#1A1A1A" stroke-width=".8"/>
      <text class="mono" x="106" y="86" text-anchor="middle" font-size="14" fill="#333" letter-spacing=".1em">REACT APP</text>
      <rect x="46" y="96" width="120" height="38" rx="4" fill="#0A1628" stroke="#1E3A5F" stroke-width=".8"/>
      <text class="mono" x="106" y="112" text-anchor="middle" font-size="14" fill="#3B82F6">usePaynow()</text>
      <text class="sans" x="106" y="127" text-anchor="middle" font-size="14" fill="#1E40AF">React hook</text>
      <rect x="46" y="144" width="120" height="34" rx="4" fill="#0D0D0D" stroke="#1E1E1E" stroke-width=".8"/>
      <text class="mono" x="56" y="159" font-size="14" fill="#444">amount</text>
      <text class="sans" x="106" y="172" text-anchor="middle" font-size="14" fill="#E5E5E5" font-weight="400">$25.00 USD</text>
      <rect x="46" y="188" width="120" height="34" rx="5" fill="#15803D" stroke="#166534" stroke-width=".8"/>
      <text class="sans" x="106" y="209" text-anchor="middle" font-size="14" fill="#FFF" font-weight="400">Pay with Paynow</text>
      <rect x="46" y="232" width="120" height="26" rx="4" fill="#051A0A" stroke="#15803D" stroke-width=".5"/>
      <text class="mono" x="106" y="248" text-anchor="middle" font-size="14" fill="#4ADE80">polling for status...</text>
      <rect x="46" y="268" width="120" height="30" rx="4" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="56" y="282" font-size="14" fill="#333">returnUrl</text>
      <text class="mono" x="56" y="295" font-size="14" fill="#555">yourapp.com/return</text>
      <g class="tick">
        <circle cx="106" cy="336" r="16" fill="#052E16" stroke="#15803D" stroke-width="1"/>
        <path d="M98,336 L104,342 L114,328" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </g>
      <text class="mono" x="106" y="360" text-anchor="middle" font-size="14" fill="#15803D">paid</text>
    </g>

    <g class="gp">
      <line class="fr" x1="181" y1="134" x2="227" y2="134" stroke="#3B82F6" stroke-width="1.2"/>
      <polygon points="223,130 229,134 223,138" fill="#3B82F6"/>
    </g>
    <g class="gp" style="animation-delay:.7s">
      <line class="fl" x1="229" y1="155" x2="181" y2="155" stroke="#22C55E" stroke-width="1"/>
      <polygon points="183,151 177,155 183,159" fill="#22C55E"/>
    </g>
    <text class="mono" x="204" y="129" text-anchor="middle" font-size="14" fill="#1E40AF">initiate</text>
    <text class="mono" x="204" y="170" text-anchor="middle" font-size="14" fill="#15803D">redirect</text>

    <g class="col">
      <rect x="230" y="40" width="172" height="274" rx="8" fill="#090909" stroke="#1E1E1E" stroke-width=".8"/>
      <text class="mono" x="316" y="66" text-anchor="middle" font-size="14" fill="#333" letter-spacing=".1em">PAYNOW API</text>
      <rect x="246" y="78" width="140" height="38" rx="4" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="316" y="94" text-anchor="middle" font-size="14" fill="#555">POST /initiate</text>
      <text class="sans" x="316" y="109" text-anchor="middle" font-size="14" fill="#333">Create session</text>
      <line x1="246" y1="124" x2="386" y2="124" stroke="#141414" stroke-width=".8"/>
      <rect x="246" y="132" width="140" height="38" rx="4" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="316" y="148" text-anchor="middle" font-size="14" fill="#555">GET /status</text>
      <text class="sans" x="316" y="163" text-anchor="middle" font-size="14" fill="#333">Poll until settled</text>
      <line x1="246" y1="178" x2="386" y2="178" stroke="#141414" stroke-width=".8"/>
      <rect x="246" y="186" width="140" height="38" rx="4" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="316" y="202" text-anchor="middle" font-size="14" fill="#555">resultUrl webhook</text>
      <text class="sans" x="316" y="217" text-anchor="middle" font-size="14" fill="#333">Server confirmation</text>
      <line x1="246" y1="232" x2="386" y2="232" stroke="#141414" stroke-width=".8"/>
      <rect x="246" y="240" width="64" height="20" rx="3" fill="#0D1117" stroke="#1E3A5F" stroke-width=".5"/>
      <text class="mono" x="278" y="253" text-anchor="middle" font-size="14" fill="#2563EB">TypeScript</text>
      <rect x="318" y="240" width="68" height="20" rx="3" fill="#0A0A0A" stroke="#1A1A1A" stroke-width=".5"/>
      <text class="mono" x="352" y="253" text-anchor="middle" font-size="14" fill="#333">open source</text>
      <rect x="246" y="270" width="140" height="28" rx="4" fill="#051A0A" stroke="#15803D" stroke-width=".5"/>
      <g class="gp">
        <circle cx="260" cy="284" r="3" fill="#4ADE80"/>
      </g>
      <text class="mono" x="316" y="288" text-anchor="middle" font-size="14" fill="#15803D">auto-polling active</text>
    </g>

    <g class="gp">
      <line class="fr" x1="402" y1="122" x2="428" y2="122" stroke="#15803D" stroke-width="1.1"/>
      <polygon points="424,118 430,122 424,126" fill="#15803D"/>
    </g>
    <g class="gp" style="animation-delay:.5s">
      <line class="fr" x1="402" y1="192" x2="428" y2="192" stroke="#1E40AF" stroke-width="1.1"/>
      <polygon points="424,188 430,192 424,196" fill="#1E40AF"/>
    </g>
    <g class="gp" style="animation-delay:.9s">
      <line class="fr" x1="402" y1="256" x2="428" y2="256" stroke="#333" stroke-width=".8"/>
      <polygon points="424,252 430,256 424,260" fill="#444"/>
    </g>

    <g class="col">
      <rect x="432" y="90" width="172" height="64" rx="7" fill="#061208" stroke="#15803D" stroke-width=".8"/>
      <rect x="432" y="90" width="172" height="4" rx="7" fill="#15803D" opacity=".4"/>
      <text class="mono" x="518" y="116" text-anchor="middle" font-size="14" fill="#4ADE80" letter-spacing=".1em">ECOCASH</text>
      <text class="sans" x="518" y="133" text-anchor="middle" font-size="14" fill="#15803D">Mobile money / ZWL USD</text>
      <rect x="432" y="164" width="172" height="64" rx="7" fill="#060D1A" stroke="#1E3A5F" stroke-width=".8"/>
      <rect x="432" y="164" width="172" height="4" rx="7" fill="#1E3A5F" opacity=".4"/>
      <text class="mono" x="518" y="190" text-anchor="middle" font-size="14" fill="#3B82F6" letter-spacing=".1em">ONEMONEY</text>
      <text class="sans" x="518" y="207" text-anchor="middle" font-size="14" fill="#1E40AF">Mobile money / ZWL USD</text>
      <rect x="432" y="238" width="172" height="64" rx="7" fill="#0A0A0A" stroke="#222" stroke-width=".8"/>
      <text class="mono" x="518" y="264" text-anchor="middle" font-size="14" fill="#444" letter-spacing=".1em">WEB CHECKOUT</text>
      <text class="sans" x="518" y="281" text-anchor="middle" font-size="14" fill="#333">Redirect / card / bank</text>
    </g>
  </svg>
</div>`,
      }}
    />
  );
}
