import React from "react";

export default function CaseStudyPage() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#f9f7f3", minHeight: "100vh" }}>

      {/* SECTION 1 — Masthead */}
      <header
        style={{
          background: "#fff",
          borderBottom: "4px solid #000",
          padding: "14px 48px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "#999",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Customer Success &middot; Advanced Manufacturing
        </span>
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
            color: "#000",
            margin: 0,
          }}
        >
          Phillips Results
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "#999",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textAlign: "right",
          }}
        >
          Vol. 24 &middot; Issue 03 / March 2026
        </span>
      </header>

      {/* SECTION 2 — Red Kicker */}
      <div
        style={{
          background: "#F9423A",
          padding: "8px 48px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#fff",
          }}
        >
          Breaking
        </span>
        <span style={{ width: 1, height: 14, background: "rgba(255,255,255,.3)" }} />
        {["Aerospace & Defense", "Federal Program", "5-Axis Consolidation"].map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(255,255,255,.15)",
              padding: "4px 10px",
              borderRadius: 2,
              fontSize: 9,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* SECTION 3 — Main Content */}
      <div
        style={{
          background: "#fff",
          padding: "36px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 44,
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Left Column */}
        <div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(26px,4vw,48px)",
              color: "#111",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            Navy Depot Slashes Cycle Times by{" "}
            <span style={{ fontStyle: "italic", color: "#F9423A" }}>Forty Percent</span>{" "}
            With Single-Setup 5-Axis Strategy
          </h1>

          {/* Rule Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 20, height: 3, background: "#F9423A" }} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#999",
              }}
            >
              By Dan Grant &middot; March 2026 &middot; 8 min read
            </span>
          </div>

          {/* Lede */}
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 14,
              color: "#222",
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            When Fleet Readiness Center East needed to reduce maintenance turnaround times
            for F/A-18 structural components, they turned to Phillips Corporation for a
            complete 5-axis machining solution that would consolidate multi-setup operations
            into single-fixture cycles.
          </p>

          {/* 2-Column Body */}
          <div
            style={{
              columnCount: 2,
              columnGap: 22,
              fontSize: 11.5,
              color: "#444",
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: "0 0 14px" }}>
              For years, the depot relied on a bank of legacy 3-axis vertical machining
              centers to process aluminum bulkhead forgings and titanium hinge fittings.
              Each part required between four and seven setups, with manual re-fixturing
              between operations adding hours to every cycle and introducing cumulative
              positional error. Tolerance stack-ups forced operators to leave excess stock
              on critical datum surfaces, which then demanded additional hand-finishing
              passes — a labor-intensive loop that ballooned lead times and consumed skilled
              workforce hours the depot could not afford to lose.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Phillips&apos; application engineering team began with a two-week process audit,
              mapping every touch point from raw forging receipt through final CMM
              inspection. The audit revealed that sixty-three percent of non-cutting time
              was consumed by fixture changeovers and in-process measurement. Armed with
              that data, the team specified a pair of Hermle C 42 U 5-axis machining
              centers equipped with Blum LC50 laser tool setters and integrated pallet
              changers, enabling lights-out second-shift operation without additional
              headcount.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Implementation followed a phased rollout. During the first thirty days,
              Phillips engineers worked side-by-side with depot machinists to convert the
              twelve highest-volume part numbers to single-setup 5-axis programs. Custom
              hydraulic fixtures — designed in-house by Phillips&apos; fixturing group — located
              each forging on three datum points and applied uniform clamping force across
              thin-wall sections prone to distortion. Toolpath strategies leveraged
              continuous B-axis positioning to maintain constant chip load around complex
              compound-angle pockets, reducing cutter deflection and extending tool life by
              an average of thirty-five percent.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Within ninety days the depot had fully transitioned all twenty-six active part
              numbers. Cycle times dropped by forty percent on average, with the most
              complex titanium hinge fitting seeing a fifty-two percent reduction.
              First-pass yield climbed from eighty-one percent to ninety-seven percent,
              virtually eliminating the rework queue that had historically bottlenecked
              final assembly. Annualized savings exceeded 1.2 million dollars, and the
              depot reallocated twelve skilled machinists from manual operations to the
              facility&apos;s new additive-repair cell — multiplying the return on the original
              equipment investment.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Results Panel */}
          <div style={{ background: "#000", padding: 24, borderRadius: 4 }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#F9423A",
                marginBottom: 16,
              }}
            >
              Results at a Glance
            </div>
            {[
              { value: "40%", label: "Cycle Time Reduction" },
              { value: "6", label: "Setups Eliminated" },
              { value: "$1.2M", label: "Annual Savings" },
              { value: "90", label: "Days to Full Production" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 48,
                    color: "#F68B33",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,.4)",
                    marginTop: 4,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Box */}
          <div style={{ background: "#f0ede6", padding: 18, marginTop: 12, borderRadius: 4 }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#999",
                marginBottom: 12,
              }}
            >
              Solutions Used
            </div>
            {[
              "Hermle C 42 U 5-Axis",
              "Blum LC50 Laser Tool Setter",
              "Phillips Application Engineering",
              "Custom Fixturing & CAM Support",
            ].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 11,
                  color: "#444",
                  padding: "6px 0",
                  borderBottom: "1px solid #e0ddd6",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — Pull Quote */}
      <div style={{ background: "#F9423A", padding: "28px 48px" }}>
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: 22,
            color: "#fff",
            maxWidth: 700,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          &ldquo;The question was never whether 5-axis could do it — it was whether we
          could retrain our process around a fundamentally different approach to fixturing
          and toolpath strategy.&rdquo;
        </p>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "rgba(255,255,255,.55)",
            marginTop: 12,
          }}
        >
          — CDR. James Walker, FRC East Maintenance Officer
        </div>
      </div>
    </div>
  );
}
