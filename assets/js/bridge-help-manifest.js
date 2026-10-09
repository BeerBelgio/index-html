// Generated from help/help-manifest.json. Do not edit this mirror independently.
window.INDEX_HELP_MANIFEST = {
  "schemaVersion": 1,
  "generatedForBuild": "0.22.24",
  "device": {
    "name": "INDEX-HTML Bridge",
    "build": "0.22.24",
    "packageName": "INDEX-HTML_Bridge_0.22.24",
    "deviceFile": "INDEX-HTML_Bridge_0.22.24.amxd",
    "creator": "BeerBelgio",
    "project": "INDEX HTML",
    "deviceType": "Max for Live Audio Effect",
    "developmentStatus": "testing_candidate",
    "liveParameterCount": 87,
    "environment": {
      "establishedTarget": "Ableton Live 12 with Max for Live",
      "knownRuntimePlatform": "macOS",
      "bundledVideoEncoderPlatforms": [
        "darwin-arm64",
        "darwin-x64"
      ],
      "intelRuntimeValidation": "validated",
      "savedPatchMaxVersion": {
        "major": 8,
        "minor": 6,
        "revision": 5,
        "architecture": "x64",
        "modernui": 1
      },
      "minimumMaxVersion": null,
      "notes": "Frozen0.22.23 native dial, opacity, Intel UI, CORE logo and external/offline HELP accepted on both Macs. Normal short OFF/INPUT exports accepted from0.22.22 and inherited unchanged. Candidate0.22.24 changes Presentation layout/copy only; new layout acceptance pending.",
      "lastNativeEvidenceBuild": "0.22.23"
    },
    "packageStructure": [
      {
        "path": "INDEX-HTML_Bridge_0.22.24.amxd",
        "role": "Root Max for Live device; keep the complete folder together."
      },
      {
        "path": "INDEX-HTML_BEERBELGIO.svg",
        "role": "Root branding asset."
      },
      {
        "path": "assets/",
        "role": "Operational icons."
      },
      {
        "path": "modules/",
        "role": "Five UI bpatchers."
      },
      {
        "path": "scripts/",
        "role": "Max JS, Node backend, native WAV validation, video encoding and file-based audio/video mux."
      },
      {
        "path": "scripts/encoder/",
        "role": "Bundled native FFmpeg/ffprobe, build metadata and licenses."
      },
      {
        "path": "tools/",
        "role": "Flat local HTML library."
      },
      {
        "path": "cache/",
        "role": "Catalogue and installed-tool metadata."
      },
      {
        "path": "docs/",
        "role": "Current changelog, roadmap and NEXT_STEP runtime checks."
      },
      {
        "path": "help/help-manifest.json",
        "role": "Authoritative current technical/product facts consumed by HELP.html."
      },
      {
        "path": "exports/",
        "role": "Created at runtime for job artifacts and diagnostics; excluded from source delivery."
      },
      {
        "path": "HELP.html",
        "role": "User-authored editable offline manual; reads the manifest through the existing localhost server."
      },
      {
        "path": "help/help-manifest.js",
        "role": "Mechanical JavaScript mirror of the JSON for the local-file fallback; regenerated at every build bump."
      },
      {
        "path": "help/fonts/",
        "role": "Local Barlow Condensed and M PLUS Rounded 1c CSS/font files/licenses; no remote font dependency."
      },
      {
        "path": "help/media/",
        "role": "Three supplied INDEX SVG assets; five Quick Start screenshots intentionally deferred."
      }
    ],
    "frozenReference": "0.22.23",
    "developmentPhase": "presentation_ui_refinement",
    "nativeAcceptance": {
      "baseline": "0.22.23",
      "dialsOnIntelAndM5": "validated",
      "mappedOpacityRefreshStability": "validated",
      "IntelScrollingAndMultipleLFOs": "validated",
      "CORELogo": "validated",
      "externalAndOfflineHELP": "validated",
      "normalShortOFFINPUTExport": "validated",
      "exportEvidenceBuild": "0.22.22",
      "candidatePresentationLayout": "awaiting_test"
    }
  },
  "architecture": {
    "controlPath": [
      "Ableton Live / Max for Live",
      "Max JS controllers + Node for Max",
      "localhost HTTP / SSE",
      "Chromium compositor",
      "5 HTML layer iframes"
    ],
    "layerCount": 5,
    "responsibilities": {
      "max": "Live parameter identities, UI, MIDI mapping, effective controls, transport acquisition and native stereo input recorder.",
      "node": "Catalogue/install/filesystem state, localhost server/SSE, loaded HTML/state, Chromium launch, frozen export jobs, PNG persistence, video encoding and closed-WAV trim/validation. Serve editable local HELP resources and mux validated audio/video files.",
      "chromium": "Tool drawing, lower-layer effect processing, five-layer composition and frame-by-frame offline PNG generation."
    },
    "rendering": "Chromium Canvas/WebGL; no Jitter renderer.",
    "eventHub": {
      "connectionsPerCompositor": 1,
      "endpoint": "/events",
      "owner": "Compositor EventSource",
      "childDelivery": "postMessage to layer iframes",
      "independentIframeEventSources": false,
      "watchdog": "Low-frequency /state polling for missed live tool/state changes."
    },
    "toolContract": {
      "manifest": "window.SKETCH_TOOL",
      "draw": "window.sketchDraw(state, hostContext)",
      "resize": "window.sketchResize(width, height)",
      "roles": [
        "generator",
        "effect"
      ],
      "generator": "Draws its own canvas.",
      "effect": "Manifest index.role=effect; fragment shader processes only the composition of layers below it.",
      "standaloneCompatibility": "window.sketchDraw(state) remains valid; missing host color opacity preserves legacy behavior."
    },
    "uiModularization": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "root": {
        "roles": [
          "CORE UI",
          "engine",
          "routing",
          "controllers",
          "87 established Live parameter objects"
        ],
        "liveParametersReparented": false
      },
      "bpatchers": [
        "modules/INDEX_UI_Layer.maxpat",
        "modules/INDEX_UI_Params.maxpat",
        "modules/INDEX_UI_Color.maxpat",
        "modules/INDEX_UI_MIDI.maxpat",
        "modules/INDEX_UI_REC.maxpat"
      ],
      "phase2Complete": true
    },
    "visibilityOwnership": {
      "genericPagesGeometryPackingWidth": "scripts/index_ui_pages_v0_22_24.js",
      "nativeParameterAndColorBanks": "scripts/index_manifest_controller.js"
    },
    "sourceFiles": {
      "manifestController": "scripts/index_manifest_controller.js",
      "pageController": "scripts/index_ui_pages_v0_22_24.js",
      "backend": "scripts/index_library_node.js",
      "exportTiming": "scripts/index_export_controller_v0_22_5.js",
      "exportFlow": "scripts/index_export_flow_v0_22_23.js",
      "audioFinalizer": "scripts/index_audio_capture.js",
      "videoEncoder": "scripts/index_video_encoder.js",
      "parameterPainter": "scripts/index_parameter_dial_painter.js",
      "audioVideoMux": "scripts/index_audio_video_mux.js"
    },
    "componentVersionPolicy": "Package0.22.24 keeps frozen export flow v0_22_23 and Node HOST_BUILD0.22.23 byte-for-byte. Their Console labels identify retained components; device filename/manifest/UI pages identify candidate0.22.24."
  },
  "ui": {
    "sections": [
      {
        "id": "core",
        "visibleLabel": null,
        "logicalName": "CORE",
        "file": "INDEX-HTML_Bridge_0.22.24.amxd"
      },
      {
        "id": "layer",
        "visibleLabel": "LAYER <n>",
        "logicalName": "LAYER",
        "file": "modules/INDEX_UI_Layer.maxpat",
        "notes": "Dynamic LAYER1-LAYER5 header; selected tool name/version remains in catalogue dropdown; LOADING status preserved."
      },
      {
        "id": "params",
        "visibleLabel": "PARAMETERS",
        "file": "modules/INDEX_UI_Params.maxpat"
      },
      {
        "id": "color",
        "visibleLabel": "COLORS & BLEND",
        "file": "modules/INDEX_UI_Color.maxpat"
      },
      {
        "id": "midi",
        "visibleLabel": "MIDI MAPPING",
        "file": "modules/INDEX_UI_MIDI.maxpat"
      },
      {
        "id": "rec",
        "visibleLabel": null,
        "file": "modules/INDEX_UI_REC.maxpat",
        "notes": "TARGET uses primary EXPORT action as the visual heading; previous redundant title object remains outside Presentation."
      }
    ],
    "controls": [
      {
        "id": "project-link",
        "visibleLabel": "<BRIDGE/>",
        "location": "CORE",
        "action": "Open the INDEX HTML project website.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-wordmark",
            "varname": "ui_wordmark"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-wordmark-hit",
            "varname": "ui_wordmark_hit"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-wordmark-url"
          }
        ],
        "implementationStatus": "implemented",
        "graphic": "assets/bridge-logo.svg",
        "url": "https://beerbelgio.github.io/index-html/",
        "runtimeValidation": "awaiting_test",
        "validationScope": "Asset/link native-accepted0.22.23; new slot geometry awaits0.22.24 UI test."
      },
      {
        "id": "repository-link",
        "visibleLabel": "?",
        "location": "CORE",
        "action": "Open the package-root HELP.html through the local Node server in the default browser.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-help",
            "varname": "ui_help"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-help-url"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "help-open-msg"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "help-url-route"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "library-node"
          }
        ],
        "implementationStatus": "implemented",
        "url": "/HELP.html",
        "opensOfflineHelp": true,
        "runtimeValidation": "validated",
        "conditionalBehaviour": "Node server must be ready and package-root HELP.html must exist; explicit HELP error otherwise.",
        "idNote": "Existing manifest control id retained for the user-authored HELP consumer; action now opens local help."
      },
      {
        "id": "live-render",
        "visibleLabel": "RENDER",
        "location": "CORE",
        "action": "Request Node to launch the live compositor in an external Chromium app window.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-output",
            "varname": "ui_output"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "open-msg"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Requires a ready localhost host and a supported installed Chromium browser."
      },
      {
        "id": "rec-panel",
        "visibleLabel": "REC",
        "location": "CORE",
        "action": "Toggle REC configuration; opening REC closes the Layer editor.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-rec",
            "varname": "ui_rec"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "closed",
          "open"
        ]
      },
      {
        "id": "layer-editor",
        "visibleLabel": null,
        "location": "CORE",
        "action": "Open the selected Layer editor; clicking its open control again closes it.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-layer1-open",
            "varname": "ui_layer1_open"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-layer2-open",
            "varname": "ui_layer2_open"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-layer3-open",
            "varname": "ui_layer3_open"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-layer4-open",
            "varname": "ui_layer4_open"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "ui-layer5-open",
            "varname": "ui_layer5_open"
          }
        ],
        "implementationStatus": "implemented",
        "labelsByState": {
          "closed": ">",
          "open": "<"
        },
        "associatedLayerLabels": [
          "L1",
          "L2",
          "L3",
          "L4",
          "L5"
        ],
        "graphics": {
          "closed": "assets/index-layer-open.svg",
          "open": "assets/index-layer-close.svg"
        },
        "options": [
          "closed",
          "open"
        ]
      },
      {
        "id": "layer-visible",
        "visibleLabel": null,
        "location": "CORE",
        "action": "Include or exclude the corresponding Layer from composition independently of its editor visibility.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l1-visible",
            "varname": "l1_visible"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-visible",
            "varname": "l2_visible"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-visible",
            "varname": "l3_visible"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-visible",
            "varname": "l4_visible"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-visible",
            "varname": "l5_visible"
          }
        ],
        "implementationStatus": "implemented",
        "associatedLayerLabels": [
          "L1",
          "L2",
          "L3",
          "L4",
          "L5"
        ],
        "liveParameter": true,
        "options": [
          0,
          1
        ]
      },
      {
        "id": "layer-summary",
        "visibleLabel": null,
        "location": "CORE",
        "action": "Display each Layer index and loaded tool name, or an empty-layer marker.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "layer1-summary",
            "varname": "layer1_summary"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "layer2-summary",
            "varname": "layer2_summary"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "layer3-summary",
            "varname": "layer3_summary"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "layer4-summary",
            "varname": "layer4_summary"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "layer5-summary",
            "varname": "layer5_summary"
          }
        ],
        "implementationStatus": "implemented",
        "interactive": false,
        "labels": "L1–L5 followed by the current tool name or —"
      },
      {
        "id": "library-selection",
        "visibleLabel": null,
        "location": "LAYER",
        "action": "Select a catalogue entry without loading it.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-tool-menu",
            "varname": "library_tool_menu"
          }
        ],
        "implementationStatus": "implemented",
        "optionsSource": "Cached remote catalogue merged with local-only installed entries."
      },
      {
        "id": "library-action",
        "visibleLabel": "LOAD L1",
        "location": "LAYER",
        "action": "Load a current/local tool, or update/download the selected tool and load it into the Layer targeted by that action.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-action-hit",
            "varname": "library_action_hit"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-action-label",
            "varname": "library_action_label"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "LOAD L1",
          "LOAD L2",
          "LOAD L3",
          "LOAD L4",
          "LOAD L5",
          "UPDATE",
          "DOWNLOAD",
          "—"
        ],
        "conditionalBehaviour": "CURRENT/LOCAL: LOAD L<n>; OUTDATED: UPDATE; MISSING: DOWNLOAD; no catalogue entry: —. LOAD while the backend is starting requests a repeat after READY."
      },
      {
        "id": "library-check",
        "visibleLabel": "CHECK INDEX",
        "location": "LAYER",
        "action": "Fetch and validate the remote catalogue, compare cached installation versions/files and refresh library statuses; do not download tool HTML.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-check",
            "varname": "ui_check"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-check-hit",
            "varname": "ui_check_hit"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-check-msg"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-check-label"
          }
        ],
        "implementationStatus": "implemented",
        "labelLayout": "Two native text lines; existing graphic comments, same control/hit area."
      },
      {
        "id": "library-update-all",
        "visibleLabel": "UPDATE ALL",
        "location": "LAYER",
        "action": "Update/download only entries evaluated as MISSING or OUTDATED.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-update-all-hit",
            "varname": "ui_update_all_hit"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-update-all-label-top",
            "varname": "ui_update_all_label_top"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-update-all-label-bottom",
            "varname": "ui_update_all_label_bottom"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-update-all-msg"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "CURRENT entries remain untouched; LOCAL entries with existing files are outside the queue.",
        "labelLayout": "Two native text lines; existing graphic comments, same control/hit area."
      },
      {
        "id": "library-status",
        "visibleLabel": null,
        "location": "LAYER",
        "action": "Display selected-entry status or current library operation/error.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "library-status",
            "varname": "library_status"
          }
        ],
        "implementationStatus": "implemented",
        "interactive": false,
        "options": [
          "CURRENT",
          "OUTDATED",
          "MISSING",
          "LOCAL",
          "Checking INDEX…",
          "DOWNLOADING",
          "UPDATE ALL …",
          "ERROR · …"
        ],
        "downloadCopy": "DOWNLOADING; no tool name in this transient state. Other progress/errors unchanged."
      },
      {
        "id": "loaded-tool",
        "visibleLabel": "LAYER <n>",
        "location": "LAYER",
        "action": "Display active editor Layer number and loading state; selected tool name/version is displayed by the separate dropdown.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "tool-name",
            "varname": "tool_name"
          }
        ],
        "implementationStatus": "implemented",
        "interactive": false
      },
      {
        "id": "params-section",
        "visibleLabel": "PARAMS",
        "location": "LAYER",
        "action": "Toggle this section independently for the active Layer.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-params-toggle",
            "varname": "ui_params_toggle"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "closed",
          "open"
        ],
        "conditionalBehaviour": "Requires an open Layer editor; each Layer retains its section-open flags within the current UI instance."
      },
      {
        "id": "color-section",
        "visibleLabel": "COLORS & BLEND",
        "location": "LAYER",
        "action": "Toggle this section independently for the active Layer.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-color-toggle",
            "varname": "ui_color_toggle"
          },
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "tool-title"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "closed",
          "open"
        ],
        "conditionalBehaviour": "Requires an open Layer editor; each Layer retains its section-open flags within the current UI instance.",
        "labelLayout": "Two native text lines; existing graphic comments, same control/hit area."
      },
      {
        "id": "midi-section",
        "visibleLabel": "MIDI",
        "location": "LAYER",
        "action": "Toggle this section independently for the active Layer.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Layer.maxpat",
            "objectId": "ui-midi-toggle",
            "varname": "ui_midi_toggle"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "closed",
          "open"
        ],
        "conditionalBehaviour": "Requires an open Layer editor; each Layer retains its section-open flags within the current UI instance."
      },
      {
        "id": "parameter-dials",
        "visibleLabel": null,
        "location": "PARAMS / PARAMETERS",
        "action": "Edit the normalized base value of P01–P12 for the active Layer. A mapped MIDI slot also draws its gray effective value without replacing the Live parameter.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p1-dial",
            "varname": "l1_p1_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p2-dial",
            "varname": "l1_p2_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p3-dial",
            "varname": "l1_p3_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p4-dial",
            "varname": "l1_p4_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p5-dial",
            "varname": "l1_p5_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p6-dial",
            "varname": "l1_p6_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p7-dial",
            "varname": "l1_p7_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p8-dial",
            "varname": "l1_p8_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p9-dial",
            "varname": "l1_p9_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p10-dial",
            "varname": "l1_p10_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p11-dial",
            "varname": "l1_p11_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "p12-dial",
            "varname": "l1_p12_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p1-dial",
            "varname": "l2_p1_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p2-dial",
            "varname": "l2_p2_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p3-dial",
            "varname": "l2_p3_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p4-dial",
            "varname": "l2_p4_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p5-dial",
            "varname": "l2_p5_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p6-dial",
            "varname": "l2_p6_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p7-dial",
            "varname": "l2_p7_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p8-dial",
            "varname": "l2_p8_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p9-dial",
            "varname": "l2_p9_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p10-dial",
            "varname": "l2_p10_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p11-dial",
            "varname": "l2_p11_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-p12-dial",
            "varname": "l2_p12_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p1-dial",
            "varname": "l3_p1_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p2-dial",
            "varname": "l3_p2_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p3-dial",
            "varname": "l3_p3_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p4-dial",
            "varname": "l3_p4_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p5-dial",
            "varname": "l3_p5_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p6-dial",
            "varname": "l3_p6_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p7-dial",
            "varname": "l3_p7_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p8-dial",
            "varname": "l3_p8_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p9-dial",
            "varname": "l3_p9_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p10-dial",
            "varname": "l3_p10_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p11-dial",
            "varname": "l3_p11_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-p12-dial",
            "varname": "l3_p12_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p1-dial",
            "varname": "l4_p1_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p2-dial",
            "varname": "l4_p2_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p3-dial",
            "varname": "l4_p3_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p4-dial",
            "varname": "l4_p4_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p5-dial",
            "varname": "l4_p5_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p6-dial",
            "varname": "l4_p6_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p7-dial",
            "varname": "l4_p7_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p8-dial",
            "varname": "l4_p8_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p9-dial",
            "varname": "l4_p9_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p10-dial",
            "varname": "l4_p10_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p11-dial",
            "varname": "l4_p11_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-p12-dial",
            "varname": "l4_p12_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p1-dial",
            "varname": "l5_p1_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p2-dial",
            "varname": "l5_p2_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p3-dial",
            "varname": "l5_p3_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p4-dial",
            "varname": "l5_p4_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p5-dial",
            "varname": "l5_p5_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p6-dial",
            "varname": "l5_p6_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p7-dial",
            "varname": "l5_p7_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p8-dial",
            "varname": "l5_p8_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p9-dial",
            "varname": "l5_p9_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p10-dial",
            "varname": "l5_p10_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p11-dial",
            "varname": "l5_p11_dial"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-p12-dial",
            "varname": "l5_p12_dial"
          }
        ],
        "implementationStatus": "implemented",
        "liveParameter": true,
        "conditionalBehaviour": "Tool manifest supplies labels, ranges, steps and active slots."
      },
      {
        "id": "parameter-values",
        "visibleLabel": null,
        "location": "PARAMS / PARAMETERS",
        "action": "Display effective values in tool-native units; typed values edit the base value and are quantized to the manifest range/step.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p1-native",
            "varname": "p1_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p2-native",
            "varname": "p2_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p3-native",
            "varname": "p3_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p4-native",
            "varname": "p4_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p5-native",
            "varname": "p5_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p6-native",
            "varname": "p6_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p7-native",
            "varname": "p7_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p8-native",
            "varname": "p8_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p9-native",
            "varname": "p9_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p10-native",
            "varname": "p10_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p11-native",
            "varname": "p11_native"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p12-native",
            "varname": "p12_native"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "UNUSED slots cannot be changed."
      },
      {
        "id": "parameter-reset",
        "visibleLabel": "↺",
        "location": "PARAMS / PARAMETERS",
        "action": "Restore only the selected slot base value to its manifest default; current MIDI modulation can still affect the effective output.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p1-reset",
            "varname": "p1_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p1-reset-hit",
            "varname": "p1_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p2-reset",
            "varname": "p2_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p2-reset-hit",
            "varname": "p2_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p3-reset",
            "varname": "p3_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p3-reset-hit",
            "varname": "p3_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p4-reset",
            "varname": "p4_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p4-reset-hit",
            "varname": "p4_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p5-reset",
            "varname": "p5_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p5-reset-hit",
            "varname": "p5_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p6-reset",
            "varname": "p6_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p6-reset-hit",
            "varname": "p6_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p7-reset",
            "varname": "p7_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p7-reset-hit",
            "varname": "p7_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p8-reset",
            "varname": "p8_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p8-reset-hit",
            "varname": "p8_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p9-reset",
            "varname": "p9_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p9-reset-hit",
            "varname": "p9_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p10-reset",
            "varname": "p10_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p10-reset-hit",
            "varname": "p10_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p11-reset",
            "varname": "p11_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p11-reset-hit",
            "varname": "p11_reset_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p12-reset",
            "varname": "p12_reset"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "p12-reset-hit",
            "varname": "p12_reset_hit"
          }
        ],
        "implementationStatus": "implemented",
        "graphic": "assets/index-reset.svg",
        "conditionalBehaviour": "Requires a manifest parameter in this slot."
      },
      {
        "id": "layer-defaults",
        "visibleLabel": "DEFAULT",
        "location": "PARAMS / PARAMETERS",
        "action": "Restore active Layer parameter bases and colors to manifest defaults and color opacity to 1.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "ui-defaults-btn",
            "varname": "ui_defaults_btn"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "ui-defaults-hit",
            "varname": "ui_defaults_hit"
          },
          {
            "file": "modules/INDEX_UI_Params.maxpat",
            "objectId": "ui-defaults-msg"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Requires a loaded manifest; does not clear MIDI mappings or reset Layer visibility/blend."
      },
      {
        "id": "color-picker",
        "visibleLabel": null,
        "location": "COLORS & BLEND",
        "action": "Open the native color picker and update the corresponding manifest color.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c1-pick-hit",
            "varname": "c1_pick_hit"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c1-pick-btn",
            "varname": "c1_pick_btn"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c1-picker",
            "varname": "c1_picker"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c2-pick-hit",
            "varname": "c2_pick_hit"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c2-pick-btn",
            "varname": "c2_pick_btn"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c2-picker",
            "varname": "c2_picker"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c3-pick-hit",
            "varname": "c3_pick_hit"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c3-pick-btn",
            "varname": "c3_pick_btn"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c3-picker",
            "varname": "c3_picker"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c4-pick-hit",
            "varname": "c4_pick_hit"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c4-pick-btn",
            "varname": "c4_pick_btn"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c4-picker",
            "varname": "c4_picker"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Only colors present in the loaded manifest produce color changes."
      },
      {
        "id": "color-hex",
        "visibleLabel": null,
        "location": "COLORS & BLEND",
        "action": "Edit six-digit RGB hex; valid values are normalized to #RRGGBB.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c1-hex",
            "varname": "c1_hex"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c2-hex",
            "varname": "c2_hex"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c3-hex",
            "varname": "c3_hex"
          },
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "c4-hex",
            "varname": "c4_hex"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Invalid hex or an UNUSED slot produces no color update."
      },
      {
        "id": "color-opacity",
        "visibleLabel": "OPACITY",
        "location": "COLORS & BLEND",
        "action": "Set host-native opacity for each active color key.",
        "sourceObjects": [
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l1-c1-alpha",
            "varname": "l1_c1_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l1-c2-alpha",
            "varname": "l1_c2_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l1-c3-alpha",
            "varname": "l1_c3_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l1-c4-alpha",
            "varname": "l1_c4_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-c1-alpha",
            "varname": "l2_c1_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-c2-alpha",
            "varname": "l2_c2_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-c3-alpha",
            "varname": "l2_c3_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l2-c4-alpha",
            "varname": "l2_c4_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-c1-alpha",
            "varname": "l3_c1_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-c2-alpha",
            "varname": "l3_c2_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-c3-alpha",
            "varname": "l3_c3_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l3-c4-alpha",
            "varname": "l3_c4_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-c1-alpha",
            "varname": "l4_c1_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-c2-alpha",
            "varname": "l4_c2_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-c3-alpha",
            "varname": "l4_c3_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l4-c4-alpha",
            "varname": "l4_c4_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-c1-alpha",
            "varname": "l5_c1_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-c2-alpha",
            "varname": "l5_c2_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-c3-alpha",
            "varname": "l5_c3_alpha"
          },
          {
            "file": "INDEX-HTML_Bridge_0.22.24.amxd",
            "objectId": "l5-c4-alpha",
            "varname": "l5_c4_alpha"
          }
        ],
        "implementationStatus": "implemented",
        "liveParameter": true,
        "options": {
          "minimum": 0,
          "maximum": 1
        }
      },
      {
        "id": "layer-blend",
        "visibleLabel": "BLEND",
        "location": "COLORS & BLEND",
        "action": "Select the Layer blend mode.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_Color.maxpat",
            "objectId": "blend-menu",
            "varname": "blend_menu"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "Normal",
          "Add",
          "Multiply",
          "Screen"
        ],
        "conditionalBehaviour": "Generator layers use these composition modes; effects process the existing lower-layer composite through their effect shader."
      },
      {
        "id": "midi-input",
        "visibleLabel": "MIDI Input",
        "location": "MIDI / MIDI MAPPING",
        "action": "Select the existing native MIDI input/source routing type.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "obj-48",
            "varname": "midi_input_menu"
          }
        ],
        "implementationStatus": "implemented",
        "optionsSource": "Runtime native routing options, dependent on the Live Set and available MIDI sources; saved umenu entries are not a fixed supported track list."
      },
      {
        "id": "midi-channel",
        "visibleLabel": "Channel",
        "location": "MIDI / MIDI MAPPING",
        "action": "Select the existing native MIDI routing channel/tap option.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "obj-47",
            "varname": "midi_channel_menu"
          }
        ],
        "implementationStatus": "implemented",
        "optionsSource": "Runtime native options for the selected source.",
        "knownRuntimeOption": "preFx",
        "notes": "preFx routing from a MIDI track before its instrument is user-validated; no new clip selector is provided."
      },
      {
        "id": "midi-source",
        "visibleLabel": "SOURCE",
        "location": "MIDI / MIDI MAPPING",
        "action": "Choose modulation source for this parameter slot.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p1-source",
            "varname": "midi_p1_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p2-source",
            "varname": "midi_p2_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p3-source",
            "varname": "midi_p3_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p4-source",
            "varname": "midi_p4_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p5-source",
            "varname": "midi_p5_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p6-source",
            "varname": "midi_p6_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p7-source",
            "varname": "midi_p7_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p8-source",
            "varname": "midi_p8_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p9-source",
            "varname": "midi_p9_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p10-source",
            "varname": "midi_p10_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p11-source",
            "varname": "midi_p11_source"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p12-source",
            "varname": "midi_p12_source"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "NONE",
          "MIDI NOTE",
          "MIDI CC"
        ],
        "conditionalBehaviour": "Rows without a manifest parameter are inactive; NOTE/CC selector is inactive for NONE."
      },
      {
        "id": "midi-id",
        "visibleLabel": "NOTE/CC",
        "location": "MIDI / MIDI MAPPING",
        "action": "Choose one note or one CC number; — leaves the mapping unassigned.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p1-id",
            "varname": "midi_p1_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p2-id",
            "varname": "midi_p2_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p3-id",
            "varname": "midi_p3_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p4-id",
            "varname": "midi_p4_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p5-id",
            "varname": "midi_p5_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p6-id",
            "varname": "midi_p6_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p7-id",
            "varname": "midi_p7_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p8-id",
            "varname": "midi_p8_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p9-id",
            "varname": "midi_p9_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p10-id",
            "varname": "midi_p10_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p11-id",
            "varname": "midi_p11_id"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p12-id",
            "varname": "midi_p12_id"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "unassigned": "—",
          "midiRange": [
            0,
            127
          ],
          "noteLabels": "C-2 through G8; note 36 is C1",
          "ccLabels": "CC 0 through CC 127"
        },
        "conditionalBehaviour": "Rows without a manifest parameter are inactive; NOTE/CC selector is inactive for NONE."
      },
      {
        "id": "midi-amount",
        "visibleLabel": "AMT%",
        "location": "MIDI / MIDI MAPPING",
        "action": "Set signed normalized MIDI contribution as a percentage.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p1-amount",
            "varname": "midi_p1_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p2-amount",
            "varname": "midi_p2_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p3-amount",
            "varname": "midi_p3_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p4-amount",
            "varname": "midi_p4_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p5-amount",
            "varname": "midi_p5_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p6-amount",
            "varname": "midi_p6_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p7-amount",
            "varname": "midi_p7_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p8-amount",
            "varname": "midi_p8_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p9-amount",
            "varname": "midi_p9_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p10-amount",
            "varname": "midi_p10_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p11-amount",
            "varname": "midi_p11_amount"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p12-amount",
            "varname": "midi_p12_amount"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "minimum": -100,
          "maximum": 100,
          "default": 50
        },
        "conditionalBehaviour": "Rows without a manifest parameter are inactive; NOTE/CC selector is inactive for NONE."
      },
      {
        "id": "midi-attack",
        "visibleLabel": "A(ms)",
        "location": "MIDI / MIDI MAPPING",
        "action": "Set MIDI note attack or CC rise smoothing.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p1-attack",
            "varname": "midi_p1_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p2-attack",
            "varname": "midi_p2_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p3-attack",
            "varname": "midi_p3_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p4-attack",
            "varname": "midi_p4_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p5-attack",
            "varname": "midi_p5_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p6-attack",
            "varname": "midi_p6_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p7-attack",
            "varname": "midi_p7_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p8-attack",
            "varname": "midi_p8_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p9-attack",
            "varname": "midi_p9_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p10-attack",
            "varname": "midi_p10_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p11-attack",
            "varname": "midi_p11_attack"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p12-attack",
            "varname": "midi_p12_attack"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "minimum": 0,
          "maximum": 5000,
          "default": 0
        },
        "conditionalBehaviour": "Rows without a manifest parameter are inactive; NOTE/CC selector is inactive for NONE."
      },
      {
        "id": "midi-release",
        "visibleLabel": "R(ms)",
        "location": "MIDI / MIDI MAPPING",
        "action": "Set MIDI note release or CC fall smoothing.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p1-release",
            "varname": "midi_p1_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p2-release",
            "varname": "midi_p2_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p3-release",
            "varname": "midi_p3_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p4-release",
            "varname": "midi_p4_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p5-release",
            "varname": "midi_p5_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p6-release",
            "varname": "midi_p6_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p7-release",
            "varname": "midi_p7_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p8-release",
            "varname": "midi_p8_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p9-release",
            "varname": "midi_p9_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p10-release",
            "varname": "midi_p10_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p11-release",
            "varname": "midi_p11_release"
          },
          {
            "file": "modules/INDEX_UI_MIDI.maxpat",
            "objectId": "midi-p12-release",
            "varname": "midi_p12_release"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "minimum": 0,
          "maximum": 10000,
          "default": 250
        },
        "conditionalBehaviour": "Rows without a manifest parameter are inactive; NOTE/CC selector is inactive for NONE."
      },
      {
        "id": "rec-quality",
        "visibleLabel": "QUALITY",
        "location": "REC / EXPORT",
        "action": "Select resolution profile and automatically apply its default FPS/OUTPUT: LOFI MP4/H.264 at30; HIFI MOV/ProRes422 at60.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "quality",
            "varname": "rec_quality"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "LOFI",
          "HIFI"
        ],
        "conditionalBehaviour": "Manual FPS/OUTPUT overrides remain until QUALITY changes; EXPORT reads current values. FORMAT/range/AUDIO are unaffected.",
        "runtimeValidation": "partially_validated",
        "validationScope": "Normal source .22 HIFI60/MOV and LOFI30/MP4 workflows accepted; preset and manual override graph unchanged and component-checked."
      },
      {
        "id": "rec-aspect-ratio",
        "visibleLabel": "FORMAT",
        "location": "REC / EXPORT",
        "action": "Select PNG aspect ratio.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "format",
            "varname": "rec_format"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "16:9",
          "1:1",
          "9:16"
        ],
        "conditionalBehaviour": "Configuration is frozen atomically for the job when EXPORT is clicked; later edits do not alter that job."
      },
      {
        "id": "rec-fps",
        "visibleLabel": "FPS",
        "location": "REC / EXPORT",
        "action": "Select deterministic frame rate.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "fps",
            "varname": "rec_fps"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "30",
          "60"
        ],
        "conditionalBehaviour": "Automatically selected by a changed QUALITY preset, then manually overridable; current selection is frozen for the job on EXPORT."
      },
      {
        "id": "rec-from-bar",
        "visibleLabel": "FROM BAR",
        "location": "REC / EXPORT",
        "action": "Set inclusive range-start bar.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "from",
            "varname": "rec_from_bar"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "integer": true,
          "minimum": 1
        },
        "conditionalBehaviour": "Configuration is frozen atomically for the job when EXPORT is clicked; later edits do not alter that job."
      },
      {
        "id": "rec-to-bar",
        "visibleLabel": "TO BAR",
        "location": "REC / EXPORT",
        "action": "Set exclusive range-end bar.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "to",
            "varname": "rec_to_bar"
          }
        ],
        "implementationStatus": "implemented",
        "options": {
          "integer": true,
          "mustBeGreaterThan": "FROM BAR"
        },
        "conditionalBehaviour": "Configuration is frozen atomically for the job when EXPORT is clicked; later edits do not alter that job."
      },
      {
        "id": "rec-output",
        "visibleLabel": "OUTPUT",
        "location": "REC / EXPORT",
        "action": "Select PNG output or additional video encoding; with AUDIO INPUT, verified video and WAV are followed by a separate mux stage.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "video",
            "varname": "rec_video"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "PNG",
          "MP4/H.264",
          "MOV/ProRes422"
        ],
        "conditionalBehaviour": "Automatically selected by a changed QUALITY preset, then manually overridable; current selection is frozen for the job on EXPORT."
      },
      {
        "id": "rec-audio",
        "visibleLabel": "AUDIO",
        "location": "REC / EXPORT",
        "action": "Select no audio pass or separate stereo input capture after visual/video processing.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "audio",
            "varname": "rec_audio"
          }
        ],
        "implementationStatus": "implemented",
        "options": [
          "OFF",
          "INPUT"
        ],
        "conditionalBehaviour": "Configuration is frozen atomically for the job when EXPORT is clicked; later edits do not alter that job."
      },
      {
        "id": "rec-export",
        "visibleLabel": "EXPORT",
        "location": "REC / EXPORT",
        "action": "Start guarded Live range control acquisition, deterministic PNG rendering and selected output/audio stages.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "export"
          },
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "export-hit"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Requires valid range/tempo/signature, ready host and no active export; rejects Arrangement/Session recording."
      },
      {
        "id": "rec-cancel",
        "visibleLabel": "ABORT",
        "location": "REC / EXPORT",
        "action": "Cancel the current export stage and restore owned transport settings; retain already produced intermediates and diagnostics.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "cancel"
          },
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "cancel-hit"
          }
        ],
        "implementationStatus": "implemented",
        "conditionalBehaviour": "Stop owned capture/recorder/encoder/muxer/export browser/finalizer as appropriate; retain completed artifacts and restore owned Live transport settings.",
        "internalCommand": "exportcancel",
        "notes": "Visible copy only; cancellation semantics unchanged."
      },
      {
        "id": "rec-status",
        "visibleLabel": null,
        "location": "REC / EXPORT",
        "action": "Display job stage, progress, completion or explicit stage error.",
        "sourceObjects": [
          {
            "file": "modules/INDEX_UI_REC.maxpat",
            "objectId": "status",
            "varname": "rec_status"
          }
        ],
        "implementationStatus": "implemented",
        "interactive": false,
        "options": [
          "IDLE",
          "STARTING...",
          "PREPARING",
          "ACQUIRING",
          "RENDERING",
          "CHECKING PNG SEQUENCE",
          "ENCODING",
          "VERIFYING VIDEO",
          "PREPARING AUDIO",
          "RECORDING AUDIO",
          "VERIFYING AUDIO",
          "DONE",
          "CANCELLED",
          "ERROR",
          "CHECKING MUX INPUTS",
          "MUXING AUDIO + VIDEO",
          "VERIFYING AUDIO + VIDEO",
          "ALIGNING AUDIO END"
        ]
      }
    ],
    "layout": {
      "oneLayerEditor": true,
      "recAndLayerEditorMutuallyExclusive": true,
      "independentLayerSections": [
        "PARAMS",
        "COLORS & BLEND",
        "MIDI"
      ],
      "closedSectionsConsumeWidth": false,
      "packing": "Device width adapts to open modules; native parameter banks remain in root.",
      "presentation": {
        "implementationStatus": "implemented",
        "runtimeValidation": "awaiting_test",
        "source": "User final CURRENT|TARGET PDF and CORE/LAYERS/REC SVG measurements",
        "coordinateSystem": "Max logical Presentation units; remove16.94-unit Live title chrome, uniform169/171.53 scale, native grid rounding up to0.5 unit",
        "usableHeight": 169,
        "panelWidths": {
          "CORE": 282,
          "LAYER": 249,
          "PARAMS": 554,
          "COLORS & BLEND": 298,
          "MIDI": 743,
          "REC": 229
        },
        "redesignedPanels": [
          "CORE",
          "LAYER",
          "REC"
        ],
        "alignmentOnlyPanels": [
          "PARAMS",
          "COLORS & BLEND",
          "MIDI"
        ],
        "nativeDialDimensionsUnchanged": true,
        "parameterHierarchyUnchanged": true,
        "font": "Ableton Sans; preserve existing native Ableton Sans Medium Regular where already used",
        "defaultFontSize": 10
      }
    },
    "clickOwnership": "Graphics/text with transparent ubutton hit areas where implemented; native controls retain their own interactions.",
    "validation": {
      "unchangedFunctionalInterface": "validated",
      "currentBuildNativeExecution": "awaiting_test",
      "acceptedNativeReferenceBuild": "0.22.23",
      "basis": "Complete requested0.22.23 native acceptance closed on both Macs. New0.22.24 Presentation/copy/alignment awaits visual and basic interaction acceptance only; engine unchanged."
    },
    "offlineHelp": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "file": "HELP.html",
      "data": "help/help-manifest.json",
      "server": "Existing Node localhost HTTP server; no Internet or RENDER window required after startup.",
      "browser": "Default browser via native Max launchbrowser.",
      "editable": true,
      "cachePolicy": "no-store; reread disk on every request",
      "resourcePolicy": "Exact local allowlist for HTML, manifest/mirror, SVGs, font.css and font files; read-only GET/HEAD, no-store; reread disk each request.",
      "contentOwner": "Accepted editorial HTML/layout; only three Color+Blend name occurrences updated to Colors & Blend in0.22.24. No help redesign.",
      "localFileFallback": "help/help-manifest.js",
      "mirrorPolicy": "Exact JSON data mirrored as window.INDEX_HELP_MANIFEST at every build bump.",
      "deviceWorkflowValidation": "validated",
      "validationScope": "Native0.22.23 ? external browser and Finder/offline fonts, INFO, quick links and accordions accepted on both Macs. Candidate retains layout/runtime/assets; only visible section-name consistency and manifest build facts change.",
      "assets": {
        "symbols": [
          "help/media/index-html-symbol.svg",
          "help/media/index-html-symbol-orange.svg",
          "help/media/index-html-wordmark.svg"
        ],
        "fontStylesheets": [
          "help/fonts/barlow-condensed/font.css",
          "help/fonts/m-plus-rounded-1c/m-plus-rounded-1c/font.css"
        ],
        "fontFiles": 25,
        "networkRequiredForAssets": false,
        "deferredScreenshots": [
          "quick-01-layer.svg",
          "quick-02-tool.svg",
          "quick-03-shape.svg",
          "quick-04-render.svg",
          "quick-05-export.svg"
        ],
        "deferredScreenshotsArePackageErrors": false
      },
      "fontHierarchy": {
        "heroBrand": "Barlow Condensed 600",
        "heroHelp": "Barlow Condensed 900",
        "quickLinks": "Barlow Condensed 600",
        "sectionTitles": "Barlow Condensed 700",
        "cardHeadings": "Barlow Condensed 600",
        "bodyAndFunctionalInterface": "M PLUS Rounded 1c"
      },
      "window": "Normal external browser; accepted final product behavior."
    },
    "displayOptimization": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "facts": [
        "Resolved UI object handles are reused while valid; invalid handles are looked up again.",
        "Repeated numeric writes are skipped only when the actual UI value already equals the requested effective value.",
        "Text colors are refreshed on mapping state/object changes and editor/tool refresh.",
        "Extra dial painter callbacks are limited to changes in MIDI overlays or removal of a prior overlay; the existing native objects drive current values; the painter only draws them.",
        "Free/external numeric dials use native drawing. INDEX MIDI painter assignment changes only when mapping state/object changes; no added LiveAPI observers or value polling."
      ],
      "authoritativeControlsThrottled": false,
      "validationScope": "Source0.22.22 Intel responsiveness accepted with multiple LFOs; candidate only reduces custom painting/LiveAPI display work. Current native visual regression pending."
    },
    "explanatoryHoverHints": {
      "implementationStatus": "implemented",
      "runtimeValidation": "awaiting_test",
      "present": false,
      "scope": "Primary device controls, section buttons, reset/value/color/MIDI fields; explanations are in HELP. Visible statuses, errors, progress, validation and parameter names remain."
    }
  },
  "layers": {
    "count": 5,
    "ids": [
      "L1",
      "L2",
      "L3",
      "L4",
      "L5"
    ],
    "compositionOrder": [
      "L1",
      "L2",
      "L3",
      "L4",
      "L5"
    ],
    "activeEditorCountMaximum": 1,
    "sectionFlags": "PARAMS, COLORS & BLEND and MIDI are independent; remembered separately for each Layer in the UI instance.",
    "visibility": "Each Layer has a separate Live-enabled visible toggle; closing its editor does not hide it.",
    "toolSelectionLoadsAutomatically": false,
    "toolLoad": "Explicit LOAD, or successful selected UPDATE/DOWNLOAD, loads the tool.",
    "toolChangeDefaults": "Loading a tool initializes numeric bases and colors from its manifest and resets color opacity to 1.",
    "perToolParameterOrColorMemory": false,
    "mappingScope": "Mapping configuration is held per Layer/slot; tool loads do not clear the existing modCfg array.",
    "effects": "An enabled loaded effect modifies the accumulated lower-layer composite; it does not process later Layers."
  },
  "library": {
    "implementationStatus": "implemented",
    "runtimeValidation": "validated",
    "remote": {
      "repository": "BeerBelgio/index-html",
      "branch": "main",
      "catalogue": "data/tools.json",
      "catalogueUrl": "https://raw.githubusercontent.com/BeerBelgio/index-html/main/data/tools.json"
    },
    "local": {
      "toolLayout": "tools/<actual-tool-filename>.html",
      "catalogueCache": "cache/registry.json",
      "installationMetadata": "cache/installed.json",
      "htmlFileCount": 21,
      "installedMetadataEntryCount": 21,
      "cachedRemoteEntryCount": 20,
      "countBasis": "Current delivered files and cache, not a live remote inventory.",
      "localOnlyFixtures": [
        "INDEX_Wave_Processor_TEST-v0.1-local.html"
      ],
      "toolFiles": [
        "Cassini_Flow-v1.7.html",
        "Caustic_Stitch-v1.9.html",
        "Cellular_Field-v1.5.html",
        "DNA_Filament-v1.0.html",
        "Electrostatic_Field-v1.0.html",
        "FormCutter-v1.4.html",
        "FormShift-v1.8.html",
        "Fractured_Mask-v1.7.html",
        "Homers_Hair-v1.0.html",
        "INDEX_Wave_Processor_TEST-v0.1-local.html",
        "Kinda_Flower-v1.0.html",
        "Lava_Lamp-v1.0.html",
        "Linking_Nodes-v2.1.html",
        "Nodal_Morph-v1.9.html",
        "Orbital_Geometry-v1.0.html",
        "Scan_Accumulator-v1.0.html",
        "Scatter_Front-v1.7.html",
        "Sticky_Plants-v1.0.html",
        "Syn_Division-v1.0.html",
        "Topographic-v1.4.html",
        "Topographic_Mask-v1.11.html"
      ]
    },
    "statuses": [
      {
        "id": "CURRENT",
        "meaning": "Local file exists and installation version equals catalogue version."
      },
      {
        "id": "OUTDATED",
        "meaning": "Local file exists and installation version differs from catalogue version."
      },
      {
        "id": "MISSING",
        "meaning": "Installation metadata or resolved local file is absent."
      },
      {
        "id": "LOCAL",
        "meaning": "Installed entry absent from the remote catalogue, with an existing local file."
      }
    ],
    "checkIndex": "Fetch/validate catalogue, cache it and compare statuses; no tool HTML download.",
    "selectedAction": "UPDATE/DOWNLOAD operates on the selected entry; after success the controller loads it into the action-targeted Layer.",
    "updateAll": "Sequential MISSING+OUTDATED queue; CURRENT left untouched; no repository ZIP download.",
    "selectionAutoLoads": false,
    "downloadIntegrity": "Validate HTML/manifest presence and use temporary-file replacement for tool writes.",
    "network": "CHECK INDEX and remote downloads require network access; cached installed tools remain local.",
    "downloadStatusCopy": "DOWNLOADING"
  },
  "parameters": {
    "liveParameterCount": 87,
    "countMethod": "Recursive parameter_enable inspection of AMXD and all five UI modules; 87 root objects, zero in UI modules.",
    "bankStructure": {
      "layers": 5,
      "numericSlotsPerLayer": 12,
      "numericLiveParameterCount": 60,
      "colorOpacitySlotsPerLayer": 4,
      "colorOpacityLiveParameterCount": 20,
      "layerVisibilityLiveParameterCount": 5,
      "connectedNonPresentationLiveParameterCount": 2,
      "connectedNonPresentationNames": [
        "MIDI Warp Amount",
        "MIDI Warp Release"
      ]
    },
    "slotLabels": "P01–P12; tool-specific labels/min/max/step/default come from the loaded manifest; unused slots show UNUSED.",
    "nativeValueConversion": "Normalized 0..1 bases map to manifest min/max and are quantized/clamped using the manifest step.",
    "automationAndExternalModulation": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "targets": "Established root Live parameter objects remain available while their UI pages are closed.",
      "identitiesStable": true
    },
    "effectiveMidiDisplay": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "baseValueRemainsMappable": true,
      "display": "Internal INDEX MIDI: gray final span/needle/numeric value, orange stored-base reference; dark remaining span. Engine-side contribution never writes the native base parameter.",
      "validationScope": "Native0.22.23 final gray needle/arc/readout, orange base and conditional MIDI/native ownership accepted on Intel/M5; candidate retains the exact painter/controller implementation."
    },
    "singleReset": "Reset the base of one active slot to its manifest default; preserves assigned MIDI contribution.",
    "defaultButton": "Restore all active Layer parameter bases, colors and opacity defaults; MIDI configuration/visibility/blend are not cleared.",
    "registry": [
      {
        "hierarchy": "root",
        "objectId": "p2-dial",
        "varname": "l1_p2_dial",
        "maxclass": "live.dial",
        "longName": "P02",
        "shortName": "L1 P02"
      },
      {
        "hierarchy": "root",
        "objectId": "p3-dial",
        "varname": "l1_p3_dial",
        "maxclass": "live.dial",
        "longName": "P03",
        "shortName": "L1 P03"
      },
      {
        "hierarchy": "root",
        "objectId": "p4-dial",
        "varname": "l1_p4_dial",
        "maxclass": "live.dial",
        "longName": "P04",
        "shortName": "L1 P04"
      },
      {
        "hierarchy": "root",
        "objectId": "p5-dial",
        "varname": "l1_p5_dial",
        "maxclass": "live.dial",
        "longName": "P05",
        "shortName": "L1 P05"
      },
      {
        "hierarchy": "root",
        "objectId": "p6-dial",
        "varname": "l1_p6_dial",
        "maxclass": "live.dial",
        "longName": "P06",
        "shortName": "L1 P06"
      },
      {
        "hierarchy": "root",
        "objectId": "p7-dial",
        "varname": "l1_p7_dial",
        "maxclass": "live.dial",
        "longName": "P07",
        "shortName": "L1 P07"
      },
      {
        "hierarchy": "root",
        "objectId": "p8-dial",
        "varname": "l1_p8_dial",
        "maxclass": "live.dial",
        "longName": "P08",
        "shortName": "L1 P08"
      },
      {
        "hierarchy": "root",
        "objectId": "p9-dial",
        "varname": "l1_p9_dial",
        "maxclass": "live.dial",
        "longName": "P09",
        "shortName": "L1 P09"
      },
      {
        "hierarchy": "root",
        "objectId": "p10-dial",
        "varname": "l1_p10_dial",
        "maxclass": "live.dial",
        "longName": "P10",
        "shortName": "L1 P10"
      },
      {
        "hierarchy": "root",
        "objectId": "p11-dial",
        "varname": "l1_p11_dial",
        "maxclass": "live.dial",
        "longName": "P11",
        "shortName": "L1 P11"
      },
      {
        "hierarchy": "root",
        "objectId": "p12-dial",
        "varname": "l1_p12_dial",
        "maxclass": "live.dial",
        "longName": "P12",
        "shortName": "L1 P12"
      },
      {
        "hierarchy": "root",
        "objectId": "amount",
        "varname": "midi_warp_amount",
        "maxclass": "live.dial",
        "longName": "MIDI Warp Amount",
        "shortName": "MIDI Amt"
      },
      {
        "hierarchy": "root",
        "objectId": "release",
        "varname": "midi_warp_release",
        "maxclass": "live.dial",
        "longName": "MIDI Warp Release",
        "shortName": "Release"
      },
      {
        "hierarchy": "root",
        "objectId": "p1-dial",
        "varname": "l1_p1_dial",
        "maxclass": "live.dial",
        "longName": "P01",
        "shortName": "L1 P01"
      },
      {
        "hierarchy": "root",
        "objectId": "l1-visible",
        "varname": "l1_visible",
        "maxclass": "live.toggle",
        "longName": "L1 Visible",
        "shortName": "L1 Vis"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-visible",
        "varname": "l2_visible",
        "maxclass": "live.toggle",
        "longName": "L2 Visible",
        "shortName": "L2 Vis"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-visible",
        "varname": "l3_visible",
        "maxclass": "live.toggle",
        "longName": "L3 Visible",
        "shortName": "L3 Vis"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-visible",
        "varname": "l4_visible",
        "maxclass": "live.toggle",
        "longName": "L4 Visible",
        "shortName": "L4 Vis"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-visible",
        "varname": "l5_visible",
        "maxclass": "live.toggle",
        "longName": "L5 Visible",
        "shortName": "L5 Vis"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p1-dial",
        "varname": "l2_p1_dial",
        "maxclass": "live.dial",
        "longName": "L2 P01",
        "shortName": "L2 P01"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p2-dial",
        "varname": "l2_p2_dial",
        "maxclass": "live.dial",
        "longName": "L2 P02",
        "shortName": "L2 P02"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p3-dial",
        "varname": "l2_p3_dial",
        "maxclass": "live.dial",
        "longName": "L2 P03",
        "shortName": "L2 P03"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p4-dial",
        "varname": "l2_p4_dial",
        "maxclass": "live.dial",
        "longName": "L2 P04",
        "shortName": "L2 P04"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p5-dial",
        "varname": "l2_p5_dial",
        "maxclass": "live.dial",
        "longName": "L2 P05",
        "shortName": "L2 P05"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p6-dial",
        "varname": "l2_p6_dial",
        "maxclass": "live.dial",
        "longName": "L2 P06",
        "shortName": "L2 P06"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p7-dial",
        "varname": "l2_p7_dial",
        "maxclass": "live.dial",
        "longName": "L2 P07",
        "shortName": "L2 P07"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p8-dial",
        "varname": "l2_p8_dial",
        "maxclass": "live.dial",
        "longName": "L2 P08",
        "shortName": "L2 P08"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p9-dial",
        "varname": "l2_p9_dial",
        "maxclass": "live.dial",
        "longName": "L2 P09",
        "shortName": "L2 P09"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p10-dial",
        "varname": "l2_p10_dial",
        "maxclass": "live.dial",
        "longName": "L2 P10",
        "shortName": "L2 P10"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p11-dial",
        "varname": "l2_p11_dial",
        "maxclass": "live.dial",
        "longName": "L2 P11",
        "shortName": "L2 P11"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-p12-dial",
        "varname": "l2_p12_dial",
        "maxclass": "live.dial",
        "longName": "L2 P12",
        "shortName": "L2 P12"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p1-dial",
        "varname": "l3_p1_dial",
        "maxclass": "live.dial",
        "longName": "L3 P01",
        "shortName": "L3 P01"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p2-dial",
        "varname": "l3_p2_dial",
        "maxclass": "live.dial",
        "longName": "L3 P02",
        "shortName": "L3 P02"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p3-dial",
        "varname": "l3_p3_dial",
        "maxclass": "live.dial",
        "longName": "L3 P03",
        "shortName": "L3 P03"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p4-dial",
        "varname": "l3_p4_dial",
        "maxclass": "live.dial",
        "longName": "L3 P04",
        "shortName": "L3 P04"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p5-dial",
        "varname": "l3_p5_dial",
        "maxclass": "live.dial",
        "longName": "L3 P05",
        "shortName": "L3 P05"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p6-dial",
        "varname": "l3_p6_dial",
        "maxclass": "live.dial",
        "longName": "L3 P06",
        "shortName": "L3 P06"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p7-dial",
        "varname": "l3_p7_dial",
        "maxclass": "live.dial",
        "longName": "L3 P07",
        "shortName": "L3 P07"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p8-dial",
        "varname": "l3_p8_dial",
        "maxclass": "live.dial",
        "longName": "L3 P08",
        "shortName": "L3 P08"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p9-dial",
        "varname": "l3_p9_dial",
        "maxclass": "live.dial",
        "longName": "L3 P09",
        "shortName": "L3 P09"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p10-dial",
        "varname": "l3_p10_dial",
        "maxclass": "live.dial",
        "longName": "L3 P10",
        "shortName": "L3 P10"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p11-dial",
        "varname": "l3_p11_dial",
        "maxclass": "live.dial",
        "longName": "L3 P11",
        "shortName": "L3 P11"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-p12-dial",
        "varname": "l3_p12_dial",
        "maxclass": "live.dial",
        "longName": "L3 P12",
        "shortName": "L3 P12"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p1-dial",
        "varname": "l4_p1_dial",
        "maxclass": "live.dial",
        "longName": "L4 P01",
        "shortName": "L4 P01"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p2-dial",
        "varname": "l4_p2_dial",
        "maxclass": "live.dial",
        "longName": "L4 P02",
        "shortName": "L4 P02"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p3-dial",
        "varname": "l4_p3_dial",
        "maxclass": "live.dial",
        "longName": "L4 P03",
        "shortName": "L4 P03"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p4-dial",
        "varname": "l4_p4_dial",
        "maxclass": "live.dial",
        "longName": "L4 P04",
        "shortName": "L4 P04"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p5-dial",
        "varname": "l4_p5_dial",
        "maxclass": "live.dial",
        "longName": "L4 P05",
        "shortName": "L4 P05"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p6-dial",
        "varname": "l4_p6_dial",
        "maxclass": "live.dial",
        "longName": "L4 P06",
        "shortName": "L4 P06"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p7-dial",
        "varname": "l4_p7_dial",
        "maxclass": "live.dial",
        "longName": "L4 P07",
        "shortName": "L4 P07"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p8-dial",
        "varname": "l4_p8_dial",
        "maxclass": "live.dial",
        "longName": "L4 P08",
        "shortName": "L4 P08"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p9-dial",
        "varname": "l4_p9_dial",
        "maxclass": "live.dial",
        "longName": "L4 P09",
        "shortName": "L4 P09"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p10-dial",
        "varname": "l4_p10_dial",
        "maxclass": "live.dial",
        "longName": "L4 P10",
        "shortName": "L4 P10"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p11-dial",
        "varname": "l4_p11_dial",
        "maxclass": "live.dial",
        "longName": "L4 P11",
        "shortName": "L4 P11"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-p12-dial",
        "varname": "l4_p12_dial",
        "maxclass": "live.dial",
        "longName": "L4 P12",
        "shortName": "L4 P12"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p1-dial",
        "varname": "l5_p1_dial",
        "maxclass": "live.dial",
        "longName": "L5 P01",
        "shortName": "L5 P01"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p2-dial",
        "varname": "l5_p2_dial",
        "maxclass": "live.dial",
        "longName": "L5 P02",
        "shortName": "L5 P02"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p3-dial",
        "varname": "l5_p3_dial",
        "maxclass": "live.dial",
        "longName": "L5 P03",
        "shortName": "L5 P03"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p4-dial",
        "varname": "l5_p4_dial",
        "maxclass": "live.dial",
        "longName": "L5 P04",
        "shortName": "L5 P04"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p5-dial",
        "varname": "l5_p5_dial",
        "maxclass": "live.dial",
        "longName": "L5 P05",
        "shortName": "L5 P05"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p6-dial",
        "varname": "l5_p6_dial",
        "maxclass": "live.dial",
        "longName": "L5 P06",
        "shortName": "L5 P06"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p7-dial",
        "varname": "l5_p7_dial",
        "maxclass": "live.dial",
        "longName": "L5 P07",
        "shortName": "L5 P07"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p8-dial",
        "varname": "l5_p8_dial",
        "maxclass": "live.dial",
        "longName": "L5 P08",
        "shortName": "L5 P08"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p9-dial",
        "varname": "l5_p9_dial",
        "maxclass": "live.dial",
        "longName": "L5 P09",
        "shortName": "L5 P09"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p10-dial",
        "varname": "l5_p10_dial",
        "maxclass": "live.dial",
        "longName": "L5 P10",
        "shortName": "L5 P10"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p11-dial",
        "varname": "l5_p11_dial",
        "maxclass": "live.dial",
        "longName": "L5 P11",
        "shortName": "L5 P11"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-p12-dial",
        "varname": "l5_p12_dial",
        "maxclass": "live.dial",
        "longName": "L5 P12",
        "shortName": "L5 P12"
      },
      {
        "hierarchy": "root",
        "objectId": "l1-c1-alpha",
        "varname": "l1_c1_alpha",
        "maxclass": "live.dial",
        "longName": "L1 C1 Opacity",
        "shortName": "L1 C1 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l1-c2-alpha",
        "varname": "l1_c2_alpha",
        "maxclass": "live.dial",
        "longName": "L1 C2 Opacity",
        "shortName": "L1 C2 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l1-c3-alpha",
        "varname": "l1_c3_alpha",
        "maxclass": "live.dial",
        "longName": "L1 C3 Opacity",
        "shortName": "L1 C3 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l1-c4-alpha",
        "varname": "l1_c4_alpha",
        "maxclass": "live.dial",
        "longName": "L1 C4 Opacity",
        "shortName": "L1 C4 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-c1-alpha",
        "varname": "l2_c1_alpha",
        "maxclass": "live.dial",
        "longName": "L2 C1 Opacity",
        "shortName": "L2 C1 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-c2-alpha",
        "varname": "l2_c2_alpha",
        "maxclass": "live.dial",
        "longName": "L2 C2 Opacity",
        "shortName": "L2 C2 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-c3-alpha",
        "varname": "l2_c3_alpha",
        "maxclass": "live.dial",
        "longName": "L2 C3 Opacity",
        "shortName": "L2 C3 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l2-c4-alpha",
        "varname": "l2_c4_alpha",
        "maxclass": "live.dial",
        "longName": "L2 C4 Opacity",
        "shortName": "L2 C4 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-c1-alpha",
        "varname": "l3_c1_alpha",
        "maxclass": "live.dial",
        "longName": "L3 C1 Opacity",
        "shortName": "L3 C1 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-c2-alpha",
        "varname": "l3_c2_alpha",
        "maxclass": "live.dial",
        "longName": "L3 C2 Opacity",
        "shortName": "L3 C2 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-c3-alpha",
        "varname": "l3_c3_alpha",
        "maxclass": "live.dial",
        "longName": "L3 C3 Opacity",
        "shortName": "L3 C3 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l3-c4-alpha",
        "varname": "l3_c4_alpha",
        "maxclass": "live.dial",
        "longName": "L3 C4 Opacity",
        "shortName": "L3 C4 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-c1-alpha",
        "varname": "l4_c1_alpha",
        "maxclass": "live.dial",
        "longName": "L4 C1 Opacity",
        "shortName": "L4 C1 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-c2-alpha",
        "varname": "l4_c2_alpha",
        "maxclass": "live.dial",
        "longName": "L4 C2 Opacity",
        "shortName": "L4 C2 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-c3-alpha",
        "varname": "l4_c3_alpha",
        "maxclass": "live.dial",
        "longName": "L4 C3 Opacity",
        "shortName": "L4 C3 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l4-c4-alpha",
        "varname": "l4_c4_alpha",
        "maxclass": "live.dial",
        "longName": "L4 C4 Opacity",
        "shortName": "L4 C4 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-c1-alpha",
        "varname": "l5_c1_alpha",
        "maxclass": "live.dial",
        "longName": "L5 C1 Opacity",
        "shortName": "L5 C1 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-c2-alpha",
        "varname": "l5_c2_alpha",
        "maxclass": "live.dial",
        "longName": "L5 C2 Opacity",
        "shortName": "L5 C2 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-c3-alpha",
        "varname": "l5_c3_alpha",
        "maxclass": "live.dial",
        "longName": "L5 C3 Opacity",
        "shortName": "L5 C3 α"
      },
      {
        "hierarchy": "root",
        "objectId": "l5-c4-alpha",
        "varname": "l5_c4_alpha",
        "maxclass": "live.dial",
        "longName": "L5 C4 Opacity",
        "shortName": "L5 C4 α"
      }
    ],
    "dialGeometry": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "sharedKnobGeometry": true,
      "source": "Established root boxes/presentation/patching geometry unchanged. Free/external controls use original live.dial drawing; INDEX MIDI-only painter preserves exact accepted .22 proportional dialGeometry. No parentpaint or pattern reconstruction.",
      "parameterObjectsReplaced": false,
      "hierarchyChanged": false,
      "validationScope": "Native0.22.23 accepted on Intel and M5;0.22.24 only translates entire root banks with their panel, retaining dial size, bank-relative alignment and paint behavior.",
      "diagnostic": "No verbose geometry logging or display-state LiveAPI observers.",
      "nativeIndicators": {
        "focus": "Native default behavior; no guessed focus state.",
        "freeAndExternal": "Original Max/Live painter owns automation, external modulation/mapping and macro/relative/dot relationships on both Max versions.",
        "INDEXMidi": "Only existing INDEX final/base information customized. Independent native automation dots enabled when supported; unsupported Max8 attributes are not set.",
        "runtimeValidation": "validated"
      }
    },
    "dialVisualState": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "nativeReference": "Existing Colors & Blend opacity live.dials: same showname=0, shownumber=0, parameter range/type/modulation metadata; numeric differs only in slot width and conditional INDEX MIDI painter.",
      "paintOwnership": "Native live.dial when INDEX MIDI is unassigned. Custom display attached only for an assigned INDEX MIDI note/CC on a manifest-defined slot; removed when unassigned/unused.",
      "activeArc": "Native active span minimum->current in free/external state; INDEX MIDI minimum->final gray.",
      "inactiveArc": "Current/final->maximum dark.",
      "internalMidi": "Gray effective/final arc/needle/readout and orange stored-base reference.",
      "externalInformation": "Native Max/Live owns relative/absolute/percentage/dot, automation and focus appearance. No value-difference inference or additional LiveAPI display-state model.",
      "parameterWritesForPainting": false,
      "acceptedGeometryBuild": "0.22.23",
      "validationScope": "Native0.22.23 accepted on Intel and M5;0.22.24 only translates entire root banks with their panel, retaining dial size, bank-relative alignment and paint behavior."
    }
  },
  "colorsAndBlend": {
    "maximumColorSlotsPerLayer": 4,
    "colorSlotNames": [
      "C1",
      "C2",
      "C3",
      "C4"
    ],
    "activeSlots": "Loaded SKETCH_TOOL.colors manifest; unused slots display UNUSED.",
    "colorInput": [
      "Native colorpicker",
      "Six-digit RGB hex textedit"
    ],
    "hexFormat": "#RRGGBB",
    "opacity": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "minimum": 0,
      "maximum": 1,
      "default": 1,
      "nativeLiveParameters": 20,
      "contract": "hostContext.colorOpacity[colorKey] in 0..1; colorKey comes from SKETCH_TOOL.colors.",
      "legacyFallback": "Missing hostContext/key preserves standalone behavior.",
      "consumesNumericSlots": false,
      "mappedDisplay": {
        "implementationStatus": "implemented",
        "runtimeValidation": "validated",
        "nativePainter": true,
        "feedbackCorrection": "Ordinary editor/library/MIDI refresh no longer sets opacity from cached effective output. Only explicit tool LOAD/DEFAULT assigns opacity defaults.",
        "rootCauseConfidence": "Source effective-to-base feedback removed in0.22.23; user now confirms stable native mapped opacity across Layer changes/panel toggles on both Macs. No new fix in0.22.24."
      }
    },
    "blend": {
      "visibleOptions": [
        "Normal",
        "Add",
        "Multiply",
        "Screen"
      ],
      "internalValues": [
        "normal",
        "add",
        "multiply",
        "screen"
      ],
      "default": "normal",
      "scope": "Per Layer; generator composition. Effect Layers instead run their lower-composite shader."
    }
  },
  "midi": {
    "implementationStatus": "implemented",
    "runtimeValidation": "validated",
    "mappingSlotsPerLayer": 12,
    "maximumLayerMappingSlots": 60,
    "visibleMappingRows": 12,
    "targets": "Active Layer P01–P12 numeric parameters; only manifest-defined parameter rows are active.",
    "sources": [
      "NONE",
      "MIDI NOTE",
      "MIDI CC"
    ],
    "idRange": [
      0,
      127
    ],
    "unassigned": {
      "visibleLabel": "—",
      "internalId": -1,
      "contribution": 0
    },
    "defaults": {
      "source": "MIDI NOTE",
      "id": -1,
      "amountPercent": 50,
      "attackMs": 0,
      "releaseMs": 250
    },
    "controls": {
      "amountPercent": [
        -100,
        100
      ],
      "attackMs": [
        0,
        5000
      ],
      "releaseMs": [
        0,
        10000
      ]
    },
    "notes": {
      "matching": "One selected pitch per slot; note labels C-2 through G8, C1=36.",
      "velocity": "Positive note velocity sets peak=velocity/127. Velocity zero/note-off does not trigger.",
      "envelope": "Attack from current value to the velocity peak, then automatic release to zero; not held until note-off."
    },
    "cc": {
      "matching": "One selected CC number per slot.",
      "target": "CC value/127.",
      "smoothing": "Attack for rising target, release for falling target."
    },
    "contribution": "finalNorm=clamp(baseNorm + envelopeValue * amountPercent/100, 0, 1), then manifest-native quantization.",
    "routing": {
      "userManaged": true,
      "selectors": [
        "MIDI Input",
        "Channel"
      ],
      "optionLists": "Native runtime routing menus; track/source-dependent.",
      "preFx": "Existing routing can receive notes before an instrument on the source MIDI track; user-validated.",
      "offlineClipSelector": false
    },
    "learn": {
      "implementationStatus": "unavailable",
      "controlPresent": false
    },
    "export": "Final effective renderer controls are acquired with the same routing/mappings; raw MIDI is not remapped during offline replay.",
    "savedMappingConfigurationPersistence": {
      "established": false,
      "notes": "Persistence of non-parameter MIDI configuration across device/Live Set reload is not established from current runtime evidence."
    }
  },
  "liveRender": {
    "implementationStatus": "implemented",
    "runtimeValidation": "validated",
    "controlLabel": "RENDER",
    "action": "Launch an external Chromium app window at the local /host compositor URL.",
    "defaultWindowSize": [
      1280,
      720
    ],
    "automaticallyLoadsSelectedTool": false,
    "browserDiscovery": {
      "macOSCandidates": [
        "Ecosia",
        "Google Chrome",
        "Chromium",
        "Brave",
        "Microsoft Edge",
        "Vivaldi",
        "Opera"
      ],
      "windowsDiscoveryImplemented": true,
      "windowsRuntimeValidation": "awaiting_test",
      "linuxDiscoveryImplemented": false
    },
    "bridge": "Live changes pass through the compositor EventSource and postMessage to five tool iframes.",
    "timing": "Live drawing advances with browser requestAnimationFrame time; the deterministic bar/FPS clock belongs to REC.",
    "separation": "RENDER opens live output; REC configures offline export. Live-window presence is not required by the dedicated headless export launcher.",
    "requirements": [
      "Ready local Node host",
      "Supported installed Chromium executable",
      "Compatible Canvas/WebGL tool/renderer support"
    ]
  },
  "offlineExport": {
    "implementationStatus": "implemented",
    "runtimeValidation": "validated",
    "validationBasis": "Source0.22.22 native accepted normal short OFF/INPUT exports on both machines: M5 HIFI ProRes60 MOV/PCM44100; Intel LOFI H26430 MP4/AAC48000. Current pipeline unchanged. This is short-workflow acceptance, not all rate/range/stress certification.",
    "ui": {
      "quality": [
        "LOFI",
        "HIFI"
      ],
      "format": [
        "16:9",
        "1:1",
        "9:16"
      ],
      "fps": [
        30,
        60
      ],
      "audio": [
        "OFF",
        "INPUT"
      ],
      "output": [
        "PNG",
        "MP4/H.264",
        "MOV/ProRes422"
      ],
      "fromBar": {
        "minimum": 1,
        "integer": true,
        "inclusive": true
      },
      "toBar": {
        "integer": true,
        "exclusive": true,
        "greaterThanFrom": true
      },
      "initialValues": {
        "quality": "HIFI",
        "format": "16:9",
        "fps": 60,
        "fromBar": 1,
        "toBar": 17,
        "audio": "OFF",
        "output": "MOV/ProRes422"
      },
      "abortLabel": "ABORT"
    },
    "dimensions": [
      {
        "quality": "LOFI",
        "format": "16:9",
        "png": [
          747,
          420
        ],
        "video": [
          748,
          420
        ],
        "videoPaddingRight": 1,
        "videoPaddingBottom": 0
      },
      {
        "quality": "LOFI",
        "format": "1:1",
        "png": [
          420,
          420
        ],
        "video": [
          420,
          420
        ],
        "videoPaddingRight": 0,
        "videoPaddingBottom": 0
      },
      {
        "quality": "LOFI",
        "format": "9:16",
        "png": [
          420,
          747
        ],
        "video": [
          420,
          748
        ],
        "videoPaddingRight": 0,
        "videoPaddingBottom": 1
      },
      {
        "quality": "HIFI",
        "format": "16:9",
        "png": [
          3840,
          2160
        ],
        "video": [
          3840,
          2160
        ],
        "videoPaddingRight": 0,
        "videoPaddingBottom": 0
      },
      {
        "quality": "HIFI",
        "format": "1:1",
        "png": [
          2160,
          2160
        ],
        "video": [
          2160,
          2160
        ],
        "videoPaddingRight": 0,
        "videoPaddingBottom": 0
      },
      {
        "quality": "HIFI",
        "format": "9:16",
        "png": [
          2160,
          3840
        ],
        "video": [
          2160,
          3840
        ],
        "videoPaddingRight": 0,
        "videoPaddingBottom": 0
      }
    ],
    "pngSequence": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "alwaysProduced": true,
      "filenamePattern": "frame_%06d.png",
      "firstFrame": 0,
      "retained": true,
      "validationScope": "All420available source .22 PNGs decode, nonblack and distinct within jobs: M5 3840x2160/120frames each; Intel747x420/60frames each (including one separately failed audio attempt)."
    },
    "videoEncoding": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "producer": "Bundled FFmpeg consumes completed PNGs; Chromium remains the renderer.",
      "formats": [
        {
          "label": "PNG",
          "videoFile": null
        },
        {
          "label": "MP4/H.264",
          "videoFile": "output.mp4",
          "codec": "h264",
          "encoder": "h264_videotoolbox",
          "profile": "High",
          "pixelFormat": "yuv420p",
          "containsAudio": false
        },
        {
          "label": "MOV/ProRes422",
          "videoFile": "output.mov",
          "codec": "prores",
          "encoder": "prores_ks",
          "profile": "Standard",
          "pixelFormat": "yuv422p10le",
          "containsAudio": false
        }
      ],
      "nativePlatforms": [
        "darwin-arm64",
        "darwin-x64"
      ],
      "ffmpegVersion": "n8.0.3",
      "verification": "ffprobe decodes/counts every frame and checks codec/profile/pixel format, dimensions, FPS, duration, zero start time and BT.709 metadata.",
      "padding": "Odd PNG dimension receives one black pixel at right/bottom for video only; no PNG resize/crop.",
      "audioPolicy": "Video encoder still produces a silent video intermediate; separate mux may attach the validated WAV after capture.",
      "validationScope": "Native .22 M5 ProRes MOV3840x2160/60FPS/120frames/2s and Intel H264 MP4748x420/30FPS/60frames/2s independently decoded, including muxed finals. Not every platform/format/rate/range combination certified.",
      "preflight": {
        "implementationStatus": "implemented",
        "runtimeValidation": "partially_validated",
        "scope": "One Node/device runtime; PNG does not require encoders.",
        "success": "One sequential ffmpeg -encoders then ffprobe -version check, shared across concurrent callers; capability result reused for either format without relaunching identical checks.",
        "failure": "Executable-check failure is retained for that runtime; no automatic repeated permission-triggering checks. Error names the executable; after resolving a macOS block, explicitly reload device/Node to retry.",
        "timeoutMillisecondsPerExecutable": {
          "darwin-x64": 30000,
          "darwin-arm64": 5000
        },
        "security": "No automatic Gatekeeper/quarantine changes. New transferred/versioned packages can still require macOS authorization; distribution signing/notarization or an evaluated stable-install strategy is future stabilization.",
        "realMediaWork": "Encoding, decoded-file verification and mux still run their required executable operations per job. Caching is for redundant capability preflight only.",
        "nativeIntelValidation": "partially_validated",
        "bundledSigning": {
          "darwin-x64": "unsigned ffmpeg and ffprobe",
          "darwin-arm64": "linker/ad-hoc signatures, no Developer ID TeamIdentifier",
          "inspection": "Read-only codesign metadata; binaries and security attributes unchanged."
        },
        "maxSideWaitMilliseconds": {
          "IntelVideoPreflight": 65000,
          "otherInitialSeed": 10000
        },
        "validationScope": "Native .22 Intel named ffmpeg/ffprobe SIGKILL followed by authorized/reloaded successful checks; later jobs reuse success cache. Normal accepted exports complete on both platforms. Transferred unsigned packages may still need macOS authorization."
      }
    },
    "controlAcquisition": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "trigger": "EXPORT only; no additional CAPTURE step.",
      "transport": "Save original insertion/start marker and loop; stop, disable loop, set/confirm start_time and current_song_time at FROM; start_playing through TO; stop at TO and restore saved marker/loop.",
      "capture": "Final renderer controls, including existing MIDI mapping results, Live automation and external parameter modulation; MIDI connection is not required.",
      "commands": [
        "layerset",
        "layersetcolor",
        "layercoloralpha",
        "layervisible",
        "layerblend"
      ],
      "maximumEvents": 200000,
      "rawMidiRecordedAndRemapped": false,
      "timelineFile": "control-timeline.json",
      "currentTransportRuntimeValidation": "partially_validated",
      "backwardClockHandling": {
        "implementationStatus": "implemented",
        "runtimeValidation": "validated",
        "measuredResolution": "Input-connected dspstate~ native reports are received directly by the flow clock inlet and retained even outside a plugsync poll; native field receipt counts are persisted. No inferred sample rate/vector.",
        "maximumSeconds": 0.002,
        "maximumBeatsFormula": "min(signalVector / sampleRate, 0.002) * nativeTempoBPM / 60 + 1e-10",
        "floatingPointEpsilonBeats": 1e-10,
        "maximumRecoveryMilliseconds": 40,
        "rule": "Only while already running: hold at the preceding advancing high-water beat within one measured signal vector capped at2ms; never accumulate backwards steps. Larger retreats, sustained retreat beyond40ms, stop or changed DSP rate/vector fail.",
        "missingResolution": "No extended tolerance; preserve the prior1e-5-beat guard.",
        "replay": "Held control events retain sequence order and nondecreasing timestamps; frame-time and last-value replay contracts are unchanged.",
        "diagnostics": [
          "Raw clock / last clock / previous advance",
          "Measured resolution and bound",
          "First eight tolerated observations and bounded recovery records",
          "Per-pass total/max backwards jitter",
          "Node accepts clock-resolution, tolerated/recovered jitter and both pass-complete events; Console reports measured resolution per origin."
        ],
        "validationScope": "Native .22 Intel48kHz/signal64/io64 reports are available and persisted; successful INPUT control pass tolerates one1.333333ms retreat and produces nondecreasing timestamps. M5 actual44100Hz/vector32 is present. Short workflow accepted; policies unchanged.",
        "dspDelivery": {
          "gate": "plugsync beat snapshot stays gated; dspstate settings do not pass through that gate",
          "cache": "Native DSP reports retained independently of a pending clock callback and across export-job reset; current reports overwrite cache; invalid/DSP-off data disable measured tolerance",
          "diagnostics": [
            "dspReportReceipts",
            "dspFieldReceipts",
            "resolution",
            "rawHostSamplesAvailable",
            "observations"
          ]
        }
      }
    },
    "replay": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "frameTime": "selectedRangeStartSeconds + frameIndex / FPS",
      "controlSampling": "Last captured value at or before frame time; no interpolation.",
      "source": "Frozen initial Layer state and tool HTML sources with recorded control events.",
      "toolContext": [
        "exporting",
        "exportTime",
        "exportFrame",
        "exportFPS",
        "exportWidth",
        "exportHeight"
      ],
      "canRenderSlowerThanRealtime": true,
      "rawMidiApplied": false,
      "determinismScope": "Frame time and captured effective controls; not a guarantee of identical random/internal state across all tools or repeated jobs."
    },
    "timing": {
      "source": "Native Live Set tempo/time signature at job start; host clock checked during acquisition.",
      "quarterBeatsPerBar": "numerator * 4 / denominator",
      "startBeat": "(FROM BAR - 1) * quarterBeatsPerBar",
      "durationSeconds": "(TO BAR - FROM BAR) * quarterBeatsPerBar * 60 / tempo",
      "frameCount": "max(1, round(durationSeconds * FPS))",
      "encodedDurationSeconds": "frameCount / FPS",
      "constantTempoAndSignatureRequired": true,
      "unexpectedStopSeekLoopJumpOrTimingChange": "Explicit acquisition error, no silent range rebase."
    },
    "artifacts": {
      "jobDirectoryPattern": "exports/<timestamp>_<QUALITY>_<ratio>_<FPS>fps_bar<FROM>-<TO>/",
      "retained": [
        "PNG sequence",
        "control-timeline.json",
        "export.json",
        "Encoded video if selected/completed",
        "Raw and validated WAV if produced",
        "Verified output-with-audio.mp4 or output-with-audio.mov when INPUT video mux succeeds",
        "renderer-diagnostics.json"
      ],
      "diagnostics": "Per-job renderer-diagnostics.json plus exports/export-diagnostics-*.jsonl, including failures before job-folder creation.",
      "finalVideoSelection": "AUDIO OFF: output.mp4/mov; AUDIO INPUT: output-with-audio.mp4/mov. Original output.mp4/mov remains a silent intermediate. PNG+INPUT keeps audio.wav separately."
    },
    "cancellation": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "behavior": "Stop current owned capture/recorder/encoder/muxer/export browser/finalizer as appropriate; restore owned start marker and loop; retain completed artifacts and diagnostics.",
      "partialPolicy": "Delete only owned unfinished video/audio publication files; no final output is marked DONE after failure.",
      "currentNativeTransportRestoration": "awaiting_test"
    },
    "overwriteProtection": {
      "jobDirectories": "Create new directory without recursive replacement; collisions fail.",
      "pngFrames": "Ordered job-token/index-checked writes inside a newly created job directory; individual PNG writes do not use an exclusive filesystem open.",
      "video": "Refuse existing final/partial output; FFmpeg -n; publish only verified result.",
      "audio": "Exclusive partial write, refuse final overwrite, exclusive hard-link publication.",
      "mux": "FFmpeg -n inside a uniquely owned temporary directory; exclusive hard-link publication; refuse any existing final file including a publication race; remove only owned temporary resources."
    },
    "preconditions": [
      "Valid bars and constant tempo/signature",
      "No active Arrangement/Session recording",
      "No other export in progress",
      "Ready Node/Chromium host"
    ],
    "doesNotRequireLiveRenderWindow": true,
    "realtimeVideoRecording": false,
    "audioVideoMux": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "deviceWorkflowValidation": "validated",
      "condition": "AUDIO INPUT and OUTPUT MP4/H.264 or MOV/ProRes422; starts only after video and complete audio.wav validation.",
      "formats": [
        {
          "label": "MP4/H.264",
          "file": "output-with-audio.mp4",
          "videoCodec": "h264",
          "audioCodec": "aac",
          "audioBitrateTarget": 192000,
          "audioEncoding": "lossy",
          "sampleRate": "Native WAV rate; unsupported AAC rates fail without resampling.",
          "deviceWorkflowValidation": "validated",
          "validationScope": "Native .22 M5 MOV/PCM or Intel MP4/AAC short source workflow, according to this format; not every platform/format/rate combination."
        },
        {
          "label": "MOV/ProRes422",
          "file": "output-with-audio.mov",
          "videoCodec": "prores",
          "audioCodec": "pcm_f32le",
          "audioEncoding": "Native stereo float32 PCM prefix preserved; end trimmed or zero-padded to video duration.",
          "deviceWorkflowValidation": "validated",
          "validationScope": "Native .22 M5 MOV/PCM or Intel MP4/AAC short source workflow, according to this format; not every platform/format/rate combination."
        }
      ],
      "durationPolicy": "align_audio_to_video",
      "durationHandling": "Mux soundtrack has round((frameCount / FPS) * nativeSampleRate) sample frames. Preserve the original PCM prefix; trim only excess ending samples or append zero PCM at the end. Original musical-range audio.wav is unchanged. Native sample rounding and AAC/container presentation precision still apply.",
      "verification": "ffprobe decodes/counts both streams and checks video format/count/FPS/color/duration/origin and native audio codec/rate/channels/aligned duration/origin. Copied video packet hashes must match. MOV PCM hash must equal the end-aligned temporary WAV, whose retained prefix is copied exactly and padding is zero.",
      "failure": "Explicit mux stage error; no false DONE; prior silent video, raw/final WAV, PNGs, timeline and metadata retained.",
      "automaticallyImplemented": true,
      "currentlyWorkingInDevice": true,
      "currentVideoFilesContainAudio": true,
      "expectedVideoWithInputContainsAudio": true,
      "binaryCapabilityTested": true,
      "componentValidation": "Current pipeline unchanged; independently inspect existing .22 outputs, decode every video/audio stream and compare silent/final copied video packets.",
      "outputs": {
        "INPUT_MP4": "output-with-audio.mp4",
        "INPUT_MOV": "output-with-audio.mov",
        "OFF_MP4": "output.mp4",
        "OFF_MOV": "output.mov",
        "PNG_INPUT": "PNG sequence + separate audio.wav; no video mux"
      },
      "verificationEvidence": {
        "sourceBuild": "0.22.22",
        "normalShortWorkflowAcceptedOn": [
          "M5",
          "Intel Mini"
        ],
        "jobs": [
          {
            "sourceBuild": "0.22.22",
            "platform": "M5 arm64",
            "job": "20261008-194934_HIFI_16-9_60fps_bar1-2",
            "file": "output.mov",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "prores",
                "sample_rate": null,
                "channels": null,
                "width": 3840,
                "height": 2160,
                "r_frame_rate": "60/1",
                "nb_read_frames": "120",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": null,
            "videoPacketsIdentical": null,
            "controlTimesMonotonic": true,
            "PNGs": 120
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "M5 arm64",
            "job": "20261008-195006_HIFI_16-9_60fps_bar1-2",
            "file": "output-with-audio.mov",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "prores",
                "sample_rate": null,
                "channels": null,
                "width": 3840,
                "height": 2160,
                "r_frame_rate": "60/1",
                "nb_read_frames": "120",
                "duration": "2.000000"
              },
              {
                "codec_type": "audio",
                "codec_name": "pcm_f32le",
                "sample_rate": "44100",
                "channels": 2,
                "width": null,
                "height": null,
                "r_frame_rate": "0/0",
                "nb_read_frames": "87",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": 0.1165443376201904,
            "videoPacketsIdentical": true,
            "controlTimesMonotonic": true,
            "PNGs": 120
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "Intel x64",
            "job": "20261009-083916_LOFI_16-9_30fps_bar1-2",
            "file": "output.mp4",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "h264",
                "sample_rate": null,
                "channels": null,
                "width": 748,
                "height": 420,
                "r_frame_rate": "30/1",
                "nb_read_frames": "60",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": null,
            "videoPacketsIdentical": null,
            "controlTimesMonotonic": true,
            "PNGs": 60
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "Intel x64",
            "job": "20261009-083950_LOFI_16-9_30fps_bar1-2",
            "file": "output-with-audio.mp4",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "h264",
                "sample_rate": null,
                "channels": null,
                "width": 748,
                "height": 420,
                "r_frame_rate": "30/1",
                "nb_read_frames": "60",
                "duration": "2.000000"
              },
              {
                "codec_type": "audio",
                "codec_name": "aac",
                "sample_rate": "48000",
                "channels": 2,
                "width": null,
                "height": null,
                "r_frame_rate": "0/0",
                "nb_read_frames": "94",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": 0.0,
            "videoPacketsIdentical": true,
            "controlTimesMonotonic": true,
            "PNGs": 60
          }
        ],
        "candidatePolicy": "Unchanged pipeline inherits accepted source short-workflow evidence; current candidate not newly native-exported."
      },
      "durationPolicyAuthority": "User explicitly selected end trimming or silence padding to align the mux soundtrack to video duration.",
      "workingValidationScope": "M5 .22 MOV has audible/nonzero PCM stereo44100Hz; Intel .22 final MP4 contains valid AAC stereo48000Hz but source capture and decoded audio are silent. Pipeline/mux acceptance does not establish nonzero Intel routing for that job."
    },
    "automaticPresets": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "profiles": [
        {
          "quality": "LOFI",
          "fps": 30,
          "output": "MP4/H.264"
        },
        {
          "quality": "HIFI",
          "fps": 60,
          "output": "MOV/ProRes422"
        }
      ],
      "trigger": "Initial QUALITY initialization and a change to the QUALITY selection.",
      "manualOverrideAllowed": true,
      "overrideLifetime": "Manual FPS/OUTPUT selections are retained until QUALITY changes. EXPORT reads the current values and does not reapply a preset when QUALITY is unchanged.",
      "unchangedFields": [
        "FORMAT",
        "FROM BAR",
        "TO BAR",
        "AUDIO"
      ],
      "pngOnlyRemainsSelectable": true,
      "jobEdits": "Later UI edits do not change an already frozen job.",
      "componentValidation": "Unchanged actual module graph:120 initialization orders, both presets, independent fields, repeated EXPORT and manual FPS/OUTPUT/PNG overrides checked. Native source .22 normal presets accepted; no new preset behavior requires native retesting."
    },
    "rendererDiagnostics": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "file": "renderer-diagnostics.json",
      "fields": [
        "actual browser name",
        "config",
        "received/expected frame counts",
        "bounded checkpoint history",
        "browser stderr tail",
        "actual browser executable path",
        "offline selection / fallback policy"
      ],
      "eventLimit": 64,
      "stderrCharacterLimit": 16384,
      "watchdog": "120 seconds without the next saved PNG; diagnostics do not reset it.",
      "failureMessage": "renderer stalled at <received>/<expected> · checkpoint <last checkpoint>",
      "validationScope": "Both native Intel source INPUT jobs select installed Chrome and generate all60 frames/MP4. renderer-diagnostics.json snapshots stop at first-PNG checkpoint; actual PNG/video/export.json establish completion, so a checkpoint snapshot is not an authoritative final frame inventory."
    },
    "browserSelection": {
      "implementationStatus": "implemented",
      "macOSPriority": [
        "Ecosia Browser",
        "Google Chrome",
        "Chromium",
        "Brave",
        "Microsoft Edge",
        "Vivaldi",
        "Opera"
      ],
      "independentOfDefaultBrowser": true,
      "userSelectorAvailable": false,
      "offlineMode": "Dedicated headless Chromium process and temporary profile; distinct from the live RENDER app window.",
      "automaticFailureFallback": false,
      "macOSPriorityScope": "Live RENDER and arm64 offline export; preserved existing discovery.",
      "intelOffline": {
        "implementationStatus": "implemented",
        "runtimeValidation": "validated",
        "preferred": "Installed Google Chrome, preferring its standard app name when multiple Chrome installations are found.",
        "fallback": "If Chrome is absent, use existing supported-browser priority and explicitly log the fallback.",
        "diagnostics": "Console INDEX EXPORT BROWSER and INDEX EXPORT START plus renderer-diagnostics.json record exact app name, executable path and selection policy.",
        "changesDefaultBrowserSetting": false,
        "changesLiveRenderSelection": false,
        "changesAppleSiliconSelection": false,
        "changesGpuFlagsOrWatchdog": false,
        "validationScope": "Actual .22 Intel OFF/INPUT logs select installed Google Chrome executable explicitly and reach complete60-frame rendering; selection unchanged."
      }
    },
    "componentValidation": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "build": "0.22.24",
      "platform": "M5 macOS arm64",
      "scope": "Source pipeline retained byte-identically except version labels. Current scoped tests cover native/MIDI paint selection, opacity UI feedback, native identities, whole-package references and offline HELP. No new native export claim.",
      "currentBuildScopedChecks": {
        "build": "0.22.24",
        "status": "passed",
        "scope": "87identity/static package checks;120preset initialization orders and manual overrides;shared/latch encoder and Intel Chrome policy fixtures;DSP out-of-poll graph/strict clock bounds;recorder lifecycle and distinct failures;actual WAV finalization/abort metadata;actual MP4/AAC and MOV/PCM component mux;HTTP/file-offline HELP/font behavior. Not native Max/Live .22 certification."
      }
    }
  },
  "audio": {
    "implementationStatus": "implemented",
    "runtimeValidation": "validated",
    "uiOptions": [
      "OFF",
      "INPUT"
    ],
    "default": "OFF",
    "source": {
      "label": "INPUT",
      "meaning": "Stereo audio entering INDEX; user routes Main/Resampling or places INDEX on Main after desired effects.",
      "automaticallyTapsMainFromAnyTrack": false,
      "includesDevicesAfterINDEX": false,
      "changesRoutingOrTrackArming": false
    },
    "capture": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "mechanism": "Native Max sfrecord~ 2 32768 connected to the stereo plugin input; disk recording, not a browser recorder.",
      "rawFilename": "audio-capture.wav",
      "format": "Stereo float32 RIFF/WAVE at the native sample rate.",
      "evidence": "Native .22 M5 stereo float32 raw44100Hz/2.352472s -> audio.wav88200frames/2s and final PCM MOV with nonzero signal. Intel raw48000Hz/2.56s -> audio.wav96000frames/2s and final AAC MP4; that specific incoming signal is silent. Accepted complete normal short capture/mux on both platforms."
    },
    "rangeCapture": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "stage": "Separate realtime audio-only pass after PNG rendering and optional silent video encoding; selected Live range runs a second time.",
      "currentTransportMethod": "Save/set/confirm start_time at FROM and use start_playing; restore original start marker/loop and stop at TO.",
      "rangeCompleteValidated": true,
      "onsetAlignmentValidated": false,
      "currentBlocker": null,
      "rangeCompleteValidationScope": "Accepted normal short BAR1->2/120BPM capture on M544100Hz and Intel48000Hz. Exact2-second WAV/final mux; onset/later ranges/other rates not certified.",
      "rangeCompleteValidationBuild": "0.22.22"
    },
    "finalWave": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "filename": "audio.wav",
      "codec": "pcm_f32le",
      "channels": 2,
      "bitsPerSample": 32,
      "sampleRate": "From the closed native WAV header; no forced resampling.",
      "sampleCount": "round(requestedMusicalDurationSeconds * nativeSampleRate)",
      "processing": "Measure native recorder/beat origin, trim pre/post-roll, copy retained PCM without normalization and check every sample is finite.",
      "validation": [
        "Stable closed RIFF/WAVE size/header",
        "Complete selected-range coverage",
        "Recorder position/file duration agreement",
        "Exact rounded musical sample count",
        "Per-channel peak/RMS/silence metadata"
      ],
      "silence": "Valid zero samples are reported through silent=true; lack of routed audio does not fabricate a signal.",
      "alignment": "Host vector/scheduler precision; not certified sample-accurate. 40 ms origin divergence is a rejection guard, not a precision guarantee."
    },
    "mux": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "deviceWorkflowValidation": "validated",
      "condition": "AUDIO INPUT and OUTPUT MP4/H.264 or MOV/ProRes422; starts only after video and complete audio.wav validation.",
      "formats": [
        {
          "label": "MP4/H.264",
          "file": "output-with-audio.mp4",
          "videoCodec": "h264",
          "audioCodec": "aac",
          "audioBitrateTarget": 192000,
          "audioEncoding": "lossy",
          "sampleRate": "Native WAV rate; unsupported AAC rates fail without resampling.",
          "deviceWorkflowValidation": "validated",
          "validationScope": "Native .22 M5 MOV/PCM or Intel MP4/AAC short source workflow, according to this format; not every platform/format/rate combination."
        },
        {
          "label": "MOV/ProRes422",
          "file": "output-with-audio.mov",
          "videoCodec": "prores",
          "audioCodec": "pcm_f32le",
          "audioEncoding": "Native stereo float32 PCM prefix preserved; end trimmed or zero-padded to video duration.",
          "deviceWorkflowValidation": "validated",
          "validationScope": "Native .22 M5 MOV/PCM or Intel MP4/AAC short source workflow, according to this format; not every platform/format/rate combination."
        }
      ],
      "durationPolicy": "align_audio_to_video",
      "durationHandling": "Mux soundtrack has round((frameCount / FPS) * nativeSampleRate) sample frames. Preserve the original PCM prefix; trim only excess ending samples or append zero PCM at the end. Original musical-range audio.wav is unchanged. Native sample rounding and AAC/container presentation precision still apply.",
      "verification": "ffprobe decodes/counts both streams and checks video format/count/FPS/color/duration/origin and native audio codec/rate/channels/aligned duration/origin. Copied video packet hashes must match. MOV PCM hash must equal the end-aligned temporary WAV, whose retained prefix is copied exactly and padding is zero.",
      "failure": "Explicit mux stage error; no false DONE; prior silent video, raw/final WAV, PNGs, timeline and metadata retained.",
      "automaticallyImplemented": true,
      "currentlyWorkingInDevice": true,
      "currentVideoFilesContainAudio": true,
      "expectedVideoWithInputContainsAudio": true,
      "binaryCapabilityTested": true,
      "componentValidation": "Current pipeline unchanged; independently inspect existing .22 outputs, decode every video/audio stream and compare silent/final copied video packets.",
      "outputs": {
        "INPUT_MP4": "output-with-audio.mp4",
        "INPUT_MOV": "output-with-audio.mov",
        "OFF_MP4": "output.mp4",
        "OFF_MOV": "output.mov",
        "PNG_INPUT": "PNG sequence + separate audio.wav; no video mux"
      },
      "verificationEvidence": {
        "sourceBuild": "0.22.22",
        "normalShortWorkflowAcceptedOn": [
          "M5",
          "Intel Mini"
        ],
        "jobs": [
          {
            "sourceBuild": "0.22.22",
            "platform": "M5 arm64",
            "job": "20261008-194934_HIFI_16-9_60fps_bar1-2",
            "file": "output.mov",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "prores",
                "sample_rate": null,
                "channels": null,
                "width": 3840,
                "height": 2160,
                "r_frame_rate": "60/1",
                "nb_read_frames": "120",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": null,
            "videoPacketsIdentical": null,
            "controlTimesMonotonic": true,
            "PNGs": 120
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "M5 arm64",
            "job": "20261008-195006_HIFI_16-9_60fps_bar1-2",
            "file": "output-with-audio.mov",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "prores",
                "sample_rate": null,
                "channels": null,
                "width": 3840,
                "height": 2160,
                "r_frame_rate": "60/1",
                "nb_read_frames": "120",
                "duration": "2.000000"
              },
              {
                "codec_type": "audio",
                "codec_name": "pcm_f32le",
                "sample_rate": "44100",
                "channels": 2,
                "width": null,
                "height": null,
                "r_frame_rate": "0/0",
                "nb_read_frames": "87",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": 0.1165443376201904,
            "videoPacketsIdentical": true,
            "controlTimesMonotonic": true,
            "PNGs": 120
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "Intel x64",
            "job": "20261009-083916_LOFI_16-9_30fps_bar1-2",
            "file": "output.mp4",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "h264",
                "sample_rate": null,
                "channels": null,
                "width": 748,
                "height": 420,
                "r_frame_rate": "30/1",
                "nb_read_frames": "60",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": null,
            "videoPacketsIdentical": null,
            "controlTimesMonotonic": true,
            "PNGs": 60
          },
          {
            "sourceBuild": "0.22.22",
            "platform": "Intel x64",
            "job": "20261009-083950_LOFI_16-9_30fps_bar1-2",
            "file": "output-with-audio.mp4",
            "streams": [
              {
                "codec_type": "video",
                "codec_name": "h264",
                "sample_rate": null,
                "channels": null,
                "width": 748,
                "height": 420,
                "r_frame_rate": "30/1",
                "nb_read_frames": "60",
                "duration": "2.000000"
              },
              {
                "codec_type": "audio",
                "codec_name": "aac",
                "sample_rate": "48000",
                "channels": 2,
                "width": null,
                "height": null,
                "r_frame_rate": "0/0",
                "nb_read_frames": "94",
                "duration": "2.000000"
              }
            ],
            "durationSeconds": 2.0,
            "audioRMS": 0.0,
            "videoPacketsIdentical": true,
            "controlTimesMonotonic": true,
            "PNGs": 60
          }
        ],
        "candidatePolicy": "Unchanged pipeline inherits accepted source short-workflow evidence; current candidate not newly native-exported."
      },
      "durationPolicyAuthority": "User explicitly selected end trimming or silence padding to align the mux soundtrack to video duration.",
      "workingValidationScope": "M5 .22 MOV has audible/nonzero PCM stereo44100Hz; Intel .22 final MP4 contains valid AAC stereo48000Hz but source capture and decoded audio are silent. Pipeline/mux acceptance does not establish nonzero Intel routing for that job."
    },
    "intermediates": {
      "retainRawCapture": true,
      "retainValidatedWave": true,
      "partialFilename": "audio.partial.wav",
      "partialCleanup": "Only an owned incomplete publication is removed on cancellation/error.",
      "retainSilentVideo": true,
      "muxTemporaryPolicy": "Unique .mux-* directory inside the job; removed after success/failure/cancellation. Verified final files and prior source artifacts retained.",
      "alignedSoundtrackTemporary": "audio-aligned.wav inside the uniquely owned .mux-* directory only when lengths differ; removed after mux completion/failure/cancellation. Original audio.wav retained."
    },
    "scope": [
      "Constant tempo/signature",
      "Stereo INDEX input only",
      "No post-TO tails or instrument/modulator phase reset",
      "Classic RIFF/WAVE; no RF64"
    ],
    "largeCapturePreflight": {
      "implementationStatus": "in_progress",
      "runtimeValidation": "awaiting_test",
      "notes": "Inherited size estimate uses a raw host clock field named samplesPerBeat whose native unit is unresolved. Native-rate large-capture safety is not certified; closed-WAV header/RIFF limits are still validated."
    },
    "runtimeEvidence": {
      "sourceBuild": "0.22.22",
      "normalShortWorkflowAcceptedOn": [
        "M5",
        "Intel Mini"
      ],
      "jobs": [
        {
          "sourceBuild": "0.22.22",
          "platform": "M5 arm64",
          "job": "20261008-194934_HIFI_16-9_60fps_bar1-2",
          "file": "output.mov",
          "streams": [
            {
              "codec_type": "video",
              "codec_name": "prores",
              "sample_rate": null,
              "channels": null,
              "width": 3840,
              "height": 2160,
              "r_frame_rate": "60/1",
              "nb_read_frames": "120",
              "duration": "2.000000"
            }
          ],
          "durationSeconds": 2.0,
          "audioRMS": null,
          "videoPacketsIdentical": null,
          "controlTimesMonotonic": true,
          "PNGs": 120
        },
        {
          "sourceBuild": "0.22.22",
          "platform": "M5 arm64",
          "job": "20261008-195006_HIFI_16-9_60fps_bar1-2",
          "file": "output-with-audio.mov",
          "streams": [
            {
              "codec_type": "video",
              "codec_name": "prores",
              "sample_rate": null,
              "channels": null,
              "width": 3840,
              "height": 2160,
              "r_frame_rate": "60/1",
              "nb_read_frames": "120",
              "duration": "2.000000"
            },
            {
              "codec_type": "audio",
              "codec_name": "pcm_f32le",
              "sample_rate": "44100",
              "channels": 2,
              "width": null,
              "height": null,
              "r_frame_rate": "0/0",
              "nb_read_frames": "87",
              "duration": "2.000000"
            }
          ],
          "durationSeconds": 2.0,
          "audioRMS": 0.1165443376201904,
          "videoPacketsIdentical": true,
          "controlTimesMonotonic": true,
          "PNGs": 120
        },
        {
          "sourceBuild": "0.22.22",
          "platform": "Intel x64",
          "job": "20261009-083916_LOFI_16-9_30fps_bar1-2",
          "file": "output.mp4",
          "streams": [
            {
              "codec_type": "video",
              "codec_name": "h264",
              "sample_rate": null,
              "channels": null,
              "width": 748,
              "height": 420,
              "r_frame_rate": "30/1",
              "nb_read_frames": "60",
              "duration": "2.000000"
            }
          ],
          "durationSeconds": 2.0,
          "audioRMS": null,
          "videoPacketsIdentical": null,
          "controlTimesMonotonic": true,
          "PNGs": 60
        },
        {
          "sourceBuild": "0.22.22",
          "platform": "Intel x64",
          "job": "20261009-083950_LOFI_16-9_30fps_bar1-2",
          "file": "output-with-audio.mp4",
          "streams": [
            {
              "codec_type": "video",
              "codec_name": "h264",
              "sample_rate": null,
              "channels": null,
              "width": 748,
              "height": 420,
              "r_frame_rate": "30/1",
              "nb_read_frames": "60",
              "duration": "2.000000"
            },
            {
              "codec_type": "audio",
              "codec_name": "aac",
              "sample_rate": "48000",
              "channels": 2,
              "width": null,
              "height": null,
              "r_frame_rate": "0/0",
              "nb_read_frames": "94",
              "duration": "2.000000"
            }
          ],
          "durationSeconds": 2.0,
          "audioRMS": 0.0,
          "videoPacketsIdentical": true,
          "controlTimesMonotonic": true,
          "PNGs": 60
        }
      ],
      "IntelInputSignal": "Silence in both raw and final WAV and decoded mux; valid capture/mux does not invent incoming signal."
    },
    "recorderValidation": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "publicationResolution": "Actual dspstate sampleRate, signalVector and ioVector required; none guessed",
      "unchangedPositionLimitSamples": "max(ioVector,signalVector)+signalVector from last advancing recorder snapshot; does not accumulate or reset on duplicate reads",
      "originSpreadLimitMs": "max(40,(max(ioVector,signalVector)+signalVector)*1000/sampleRate)",
      "rangeCoverage": "Closed WAV must cover complete musical range plus origin; no padding of missing capture to manufacture success",
      "specificFailures": [
        "audio-dsp-resolution-unavailable",
        "audio-dsp-resolution-changed",
        "audio-recorder-position-regressed",
        "audio-recorder-no-progress",
        "audio-host-sample-counter-regressed",
        "audio-origin-negative",
        "audio-origin-diverged",
        "audio-recorder-duration-insufficient",
        "audio-wav-range-incomplete"
      ],
      "diagnostics": [
        "recorder start/stop commands (not invented native state acknowledgment)",
        "requestedActive",
        "current and previous snapshot positions",
        "host beat and raw sample counter",
        "elapsed host samples vs measured allowance",
        "expected musical duration",
        "audio origin bounds",
        "specific failed validation",
        "closed raw file actual duration/rate/channels/sampleframes after abort"
      ],
      "validationScope": "Native .22 short workflow completes with actual DSP resolution and exact selected duration on both platforms. All guards preserved; wider onset/rate/range certification remains separate."
    }
  },
  "workflows": {
    "selectAndLoadTool": {
      "implementationStatus": "implemented",
      "steps": [
        {
          "action": "Open Layer editor",
          "control": "layer-editor",
          "select": "L1–L5"
        },
        {
          "action": "Select catalogue entry",
          "control": "library-selection",
          "result": "Selection only"
        },
        {
          "action": "Activate selected-entry action",
          "control": "library-action",
          "result": "LOAD L<n>, or UPDATE/DOWNLOAD then load"
        },
        {
          "action": "Use active Layer sections",
          "controls": [
            "params-section",
            "color-section",
            "midi-section"
          ]
        }
      ]
    },
    "checkUpdateLibrary": {
      "implementationStatus": "implemented",
      "steps": [
        {
          "action": "Compare remote/local catalogue",
          "control": "library-check"
        },
        {
          "action": "Inspect CURRENT/OUTDATED/MISSING/LOCAL",
          "control": "library-status"
        },
        {
          "action": "Update/download selected entry or queue MISSING+OUTDATED",
          "controls": [
            "library-action",
            "library-update-all"
          ]
        }
      ]
    },
    "liveRendering": {
      "implementationStatus": "implemented",
      "steps": [
        {
          "action": "Explicitly load tool(s)",
          "control": "library-action"
        },
        {
          "action": "Open external compositor window",
          "control": "live-render"
        },
        {
          "action": "Apply Layer visibility/parameter/color/MIDI changes",
          "result": "Live bridge updates composition"
        }
      ]
    },
    "offlineVisualExport": {
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "steps": [
        {
          "action": "Explicitly load tool(s) and prepare existing automation/MIDI routing",
          "control": "library-action"
        },
        {
          "action": "Configure constant-tempo bar range/resolution/FPS/output; AUDIO OFF",
          "controls": [
            "rec-quality",
            "rec-aspect-ratio",
            "rec-fps",
            "rec-from-bar",
            "rec-to-bar",
            "rec-output",
            "rec-audio"
          ]
        },
        {
          "action": "Start job",
          "control": "rec-export"
        },
        {
          "action": "Acquire effective controls in Live FROM→TO",
          "result": "Stop at TO; restore original marker/loop"
        },
        {
          "action": "Replay deterministic frame times in dedicated Chromium",
          "result": "PNG sequence + control-timeline.json"
        },
        {
          "action": "Encode/verify optional silent video",
          "result": "output.mp4 or output.mov"
        },
        {
          "action": "Check completion/error status and job artifacts",
          "control": "rec-status"
        }
      ],
      "automaticPresetReference": "offlineExport.automaticPresets"
    },
    "audioEnabledExport": {
      "implementationStatus": "in_progress",
      "runtimeValidation": "validated",
      "steps": [
        {
          "action": "Route desired stereo signal into INDEX; prepare repeatable audio source"
        },
        {
          "action": "Select AUDIO INPUT and configure visual export",
          "control": "rec-audio"
        },
        {
          "action": "Start normal control/PNG/video stages",
          "control": "rec-export"
        },
        {
          "action": "Run a second native realtime audio pass over FROM→TO",
          "result": "audio-capture.wav"
        },
        {
          "action": "Trim/validate native audio if full capture passes",
          "result": "Separate audio.wav and audio metadata"
        },
        {
          "action": "For INPUT MP4/MOV, end-align a temporary soundtrack to video duration by exact PCM prefix trimming or zero padding, then stream-copy video and attach audio; verify both before publication.",
          "result": "output-with-audio.mp4 (AAC) or output-with-audio.mov (float32 PCM); original silent video and WAVs retained.",
          "runtimeValidation": "validated",
          "validationScope": "Accepted .22 normal short source workflow; pipeline unchanged."
        },
        {
          "action": "Inspect DONE versus explicit AUDIO error",
          "control": "rec-status",
          "notes": "Video INPUT jobs require successful final mux verification before DONE. PNG+INPUT keeps the complete WAV separately."
        }
      ]
    },
    "localHelp": {
      "implementationStatus": "implemented",
      "runtimeValidation": "validated",
      "steps": [
        {
          "control": "repository-link",
          "action": "? requests local HELP URL and launches the default browser; Node must be ready."
        },
        {
          "action": "HTTP page fetches authoritative JSON and logo through localhost; no compositor/SSE or Internet required."
        },
        {
          "action": "Direct file opening falls back to the mechanically generated JS mirror when fetch is blocked."
        },
        {
          "action": "After editing authoritative JSON, regenerate its JS mirror for standalone use; HTML/JSON/JS/assets are reread through no-store HTTP routes."
        }
      ]
    }
  },
  "limitations": [
    {
      "id": "constant-timing",
      "category": "deliberate_limitation",
      "fact": "Export requires constant tempo/time signature and uninterrupted forward acquisition; no tempo/signature map reconstruction."
    },
    {
      "id": "received-controls-only",
      "category": "deliberate_limitation",
      "fact": "Replay uses controls actually received during acquisition; no raw clip extraction or reconstruction of unreceived automation."
    },
    {
      "id": "offline-only-video",
      "category": "deliberate_limitation",
      "fact": "No realtime screen/video recorder; tools do not own export."
    },
    {
      "id": "bounded-banks",
      "category": "deliberate_limitation",
      "fact": "Five Layers, up to 12 numeric parameters and four colors per Layer; 200000 acquired controls maximum."
    },
    {
      "id": "no-tool-value-memory",
      "category": "deliberate_limitation",
      "fact": "Explicit tool loading restores manifest defaults; no per-tool parameter/color value memory."
    },
    {
      "id": "renderer-requirement",
      "category": "compatibility_limitation",
      "fact": "Installed supported Chromium and working Canvas/WebGL are required; no Jitter or non-Chromium fallback renderer."
    },
    {
      "id": "mac-video-encoder",
      "category": "compatibility_limitation",
      "fact": "Bundled MP4/MOV encoding is macOS arm64/x64 only. PNG is the implemented encoder-independent option."
    },
    {
      "id": "not-universal-tool-determinism",
      "category": "deliberate_limitation",
      "fact": "Deterministic frame timing/control replay does not reconstruct every tool random/internal state or certify identical repeated runs."
    },
    {
      "id": "manual-input-routing",
      "category": "deliberate_limitation",
      "fact": "AUDIO INPUT records only INDEX stereo input; user manages Main/Resampling routing; devices after INDEX and post-TO tails are excluded."
    },
    {
      "id": "two-live-passes",
      "category": "deliberate_limitation",
      "fact": "INPUT export runs Live twice; instrument/LFO/random state is not reset to guarantee identical passes."
    },
    {
      "id": "native-audio-acceptance",
      "category": "awaiting_runtime_validation",
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "fact": "Normal short .22 OFF/INPUT exports accepted on M5 and Intel. Sample-accurate onset, later/long ranges, alternative rates and CANCEL/transport restoration remain separately uncertified."
    },
    {
      "id": "retained-intermediates",
      "category": "deliberate_limitation",
      "fact": "PNGs, timeline, metadata, raw/final WAVs, silent video and verified audio/video file are retained; cleanup policy remains deferred."
    },
    {
      "id": "audio-riFF",
      "category": "compatibility_limitation",
      "fact": "Audio finalizer supports stereo float32 classic/extensible RIFF/WAVE input and classic RIFF output, not RF64."
    },
    {
      "id": "mux-device-acceptance",
      "category": "awaiting_runtime_validation",
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "fact": "Normal short .22 OFF/INPUT exports accepted on M5 and Intel. Sample-accurate onset, later/long ranges, alternative rates and CANCEL/transport restoration remain separately uncertified."
    },
    {
      "id": "mux-end-alignment",
      "category": "deliberate_limitation",
      "fact": "Mux soundtrack is trimmed or zero-padded only at its end to nearest native sample of frame-rounded video duration. Original musical-range WAV remains unchanged; AAC/container timestamps may quantize the presented duration."
    },
    {
      "id": "aac-lossy",
      "category": "deliberate_limitation",
      "fact": "MP4 uses lossy AAC with codec priming/padding handled by container timestamps; validated original float32 WAV is retained. MOV keeps float32 PCM unchanged."
    }
  ],
  "knownIssues": [
    {
      "id": "audio-clock-unit",
      "category": "current_issue_under_investigation",
      "implementationStatus": "in_progress",
      "runtimeValidation": "awaiting_test",
      "fact": "Raw native clock field named samplesPerBeat has unresolved units; inherited long-recording size preflight cannot be certified. WAV header sample rate remains authoritative for file validation."
    },
    {
      "id": "module-search-warning",
      "category": "current_diagnostic_unresolved",
      "implementationStatus": "in_progress",
      "runtimeValidation": "partially_validated",
      "fact": "All five bpatchers already use correct Patcher:/modules/... references and native UI loads. Search-path warnings are still reported. Native name-validation/load-order cause is not established; removing correct references or changing hierarchy is not an established safe fix."
    },
    {
      "id": "encoder-permission-preflight",
      "category": "compatibility_limitation",
      "implementationStatus": "implemented",
      "runtimeValidation": "partially_validated",
      "fact": "Named native Intel authorization failures precede later successful cached checks/exports; distribution friction remains. No security bypass; signing/notarization/stable installation future work."
    },
    {
      "id": "m5-control-handoff-stress",
      "category": "observed_stress_performance_limit",
      "implementationStatus": "in_progress",
      "runtimeValidation": "failed_current_test",
      "fact": "Source .22 separate M5 stress:21250controls captured, Max API timeline dictionary request times out and Node child restarts before renderer/audio. No failed supported normal job reproduced; no quantified safe load or proof of restart cause. Normal short acceptance remains valid.",
      "freezeBlockerForAcceptedShortWorkflow": false
    }
  ],
  "future": {
    "items": [
      {
        "id": "validated-export-cleanup",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "After a fully validated successful job, retain the final encoded OFF video or muxed INPUT video as the user artifact; define safe cleanup with explicit PNG workflow and development/error diagnostic retention."
      },
      {
        "id": "open-section-highlight",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "Approved: PARAMS / COLORS & BLEND / MIDI stay highlighted while open and return to normal when closed."
      },
      {
        "id": "new-compositor-tools",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "New INDEX compositor tools."
      },
      {
        "id": "new-fx-tools",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "New INDEX FX tools."
      },
      {
        "id": "tool-role-filter",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "Layer selector filtering by generator/compositor/FX role; explicit role/category manifest metadata may be required."
      },
      {
        "id": "tempo-signature-maps",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "Deferred reconstruction of changing tempo/time-signature maps."
      },
      {
        "id": "public-font-folder-flattening",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "Possible public INDEX HTML repository cleanup of m-plus-rounded-1c/m-plus-rounded-1c folder nesting; current supplied offline paths intentionally preserved."
      },
      {
        "id": "further-presentation-refinement",
        "implementationStatus": "planned",
        "currentlyAvailable": false,
        "scope": "Further user-specified CURRENT|TARGET refinements beyond this CORE/Layer/REC pass; no general redesign of accepted parameter/color/MIDI panels."
      }
    ],
    "productDecisions": {
      "singleDevice": true,
      "splitRecOnlyAfterProfilingProvesIdleCost": true,
      "heavyExportWorkDemandDriven": true,
      "layers": 5,
      "liveParameterCount": 87,
      "phase2BpatcherModularization": "completed_accepted",
      "realtimeVideoRecording": false,
      "visualExportOwner": "browser compositor",
      "individualToolsRecordThemselves": false,
      "helpWindow": "Normal external browser; no active floating/jweb/app-style HELP plan.",
      "frozenReference": "0.22.23"
    }
  }
};
