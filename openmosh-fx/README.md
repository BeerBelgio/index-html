# OpenMosh FX

38 effects from [OpenMosh](https://github.com/zivavu/OpenMosh), exported as INDEX `fragment-webgl2` effects (effect API v2, provisional). Each file is standalone: drop it into the INDEX Playground on a layer above a generator, or open it in a browser to try it on a test card or your own image or video.

These files are generated. Fix an effect in OpenMosh and export again rather than editing them here.

## Effects

| Effect | What it does | Controls | History |
| --- | --- | --- | --- |
| [Mirror](Mirror-v1.0.html) | Folds one half of the frame over the other. | Amount, Side, Position | |
| [Kaleido](Kaleido-v1.0.html) | Repeats a wedge of the frame around the centre. | Amount, Sides, Angle | |
| [Channel Split](Channel_Split-v1.0.html) | Pulls red, green and blue apart, in a line, from the centre or as a prism. | Mode (Linear / Radial / Prismatic), Amount, Angle, Falloff, Speed, Hue Shift | |
| [Duotone](Duotone-v1.0.html) | Maps shadows and highlights to two colours of your choice. | Intensity, Shadow (colour), Highlight (colour) | |
| [Scanlines](Scanlines-v1.0.html) | Rolling CRT lines across the picture. | Count, Amount | |
| [Bulge](Bulge-v1.0.html) | Pushes the frame out from a point, or pinches it in. | Amount, Radius, Center X, Center Y | |
| [Jitter](Jitter-v1.0.html) | Patches of the frame twitch out of place, each on its own clock. | Amount, Speed | |
| [Wobble](Wobble-v1.0.html) | A slow noise warp that makes the frame swim. | Amount, Frequency, Speed | |
| [Slices](Slices-v1.0.html) | Cuts the frame into strips and slides every other one. | Count, Offset, Angle | |
| [Tile](Tile-v1.0.html) | Repeats the frame as a grid of copies that can drift along the rows. | Amount, Size, Offset, Angle, Speed | |
| [Glitch](Glitch-v1.0.html) | Quiet stretches, then fits of torn bands and colour shifts. | Amount, Speed | |
| [Data Bend](Data_Bend-v1.0.html) | Runs of blocks shift and smear like broken bytes in a file. | Intensity, Corruption, Channel Shift, Speed | |
| [Optical Flow](Optical_Flow-v1.0.html) | Smears colour along the picture's own contours, like brush strokes. | Amount, Speed | |
| [VHS](VHS-v1.0.html) | Tape noise, colour bleed and a tracking band rolling down the frame. | Static, Speed, Tracking | |
| [Grain](Grain-v1.0.html) | Film grain, in mono or colour, mixed in three ways. | Amount, RGB (on/off), Blend Mode (Additive / Softlight / Multiply) | |
| [Screen Jump](Screen_Jump-v1.0.html) | The frame rolls like a TV losing its vertical hold. | Direction (Vertical / Horizontal), Intensity, Speed | |
| [Resize Glitch](Resize_Glitch-v1.0.html) | The frame snaps to a new scale around a point on random ticks. | Chance, Rate, Level X, Level Y, Random Width (on/off), Random Height (on/off), Random Center (on/off), Center X, Center Y | |
| [Stylize Glitch](Stylize_Glitch-v1.0.html) | Random rectangles get inverted, dithered or hue shifted. | Glitch Size, Glitch Rate, Count, Style (Random / Invert / Dither / Hue Shift) | |
| [Melt](Melt-v1.0.html) | Drips run down the frame and pile up, the bright parts first. | Amount, Speed | Yes |
| [Thermal](Thermal-v1.0.html) | A heat-camera palette: thermal, infrared or night vision. | Intensity, Palette (Thermal / Infrared / Night Vision) | |
| [Pixel Sort](Pixel_Sort-v1.0.html) | Streaks pixels along rows or columns between two brightness limits. | Threshold, Ceiling, Range, Direction (Horizontal / Vertical), Reverse (on/off) | |
| [Smear](Smear-v1.0.html) | Pushes each pixel along a direction set by its own colour. | Amount, Angle, Trail | |
| [Fiber Displace](Fiber_Displace-v1.0.html) | Combs the frame into threads that pull it sideways. | Pull, Fiber Density, Comb, Angle, Sheen, Silk | |
| [Relief](Relief-v1.0.html) | Reads brightness as height and lights it like embossed metal. | Depth, Angle | |
| [Tunnel](Tunnel-v1.0.html) | Feeds the last frame back in, zoomed and turned, into an endless tunnel. | Zoom, Spin, Decay | Yes |
| [Feedback](Feedback-v1.0.html) | Layers each frame over the last, scaled, turned and hue shifted. | Decay, Scale, Rotate, Warp, Hue Shift, Blend (Max / Screen / Add) | Yes |
| [Swirl](Swirl-v1.0.html) | Twists the frame around its centre. | Angle, Radius, Speed | |
| [Ripple](Ripple-v1.0.html) | Waves run through the frame like a disturbed pond. | Amount, Frequency, Speed | |
| [Blur](Blur-v1.0.html) | A smooth Gaussian blur. | Radius | |
| [Radial Blur](Radial_Blur-v1.0.html) | Streaks the frame out from the centre. | Strength | |
| [Liquid Light](Liquid_Light-v1.0.html) | Refracts the frame through slow, merging blobs of liquid. | Cell Size, Flow, Refraction, Dispersion | Yes |
| [Flow Contours](Flow_Contours-v1.0.html) | Bands the picture by brightness and slides the bands against each other. | Bands, Flow, Hue Cycle, Sheen | Yes |
| [RGB Burst](RGB_Burst-v1.0.html) | Noise bursts throw each colour channel a different way. | Amplitude, Decay, Speed | |
| [RGB Strobe](RGB_Strobe-v1.0.html) | Each colour channel flips to its negative on its own beat. | Rate, Stagger, Duty, Red (on/off), Green (on/off), Blue (on/off) | |
| [Circle Warp](Circle_Warp-v1.0.html) | Bends the frame's height into a ring. | Radius, Width, Rotation, Feather | |
| [Pixel Shifter](Pixel_Shifter-v1.0.html) | Rows and columns slide by a wave running along the other axis. | H Frequency, H Phase, H Random, V Frequency, V Phase, V Random, Sinusoidal (on/off), Mirror (on/off) | |
| [Ring Warp](Ring_Warp-v1.0.html) | Concentric rings fold the picture in and out. | Rings, Phase, Speed, Mode (Single / Double), X Smear, Y Smear, Center X, Center Y | |
| [Shockwave](Shockwave-v1.0.html) | A ring of distortion travels out from a point. | Rate, Magnitude, Distortion, Center X, Center Y | |

"History" marks the effects that read their own last frame (`effect.history: true`); Reset History in the Playground clears it.

## Controls

- Every control is a number, so any host that draws sliders can run every effect.
- On/off controls carry `type: "toggle"` and send 0 or 1.
- Multiple-choice controls carry `type: "choice"` with `options: [{ value, label }]` and send the option's index.
- Hosts that don't read `type` yet show those as sliders over the same numbers.
- Plain sliders are listed in `audio`, so a host may modulate them.

## How an OpenMosh effect becomes an INDEX pass

The GLSL body of each pass is OpenMosh's own. The exporter only swaps its header:

- `uInput`, `uHistory`, `uTime`, `uDelta` and `vUV` stand in for OpenMosh's `u_texture`, `u_feedback`, `u_time`, `u_delta` and `v_uv`.
- OpenMosh measures sizes in a frame 720 pixels on its short side; `u_resolution` is rebuilt from `uResolution` that way, so an effect looks the same at any output size.
- OpenMosh's image runs top to bottom and its textures repeat mirrored and sample nearest unless an effect asks otherwise. Every texture read goes through a small sampler that does the same on the host's textures.
- OpenMosh runs an effect's clock at its Speed. Here `uTime` is multiplied by Speed, so moving Speed while it plays also jumps the motion along.

## Left out

- OpenMosh can lock an effect's clock to a song's beats. INDEX hosts don't pass a tempo yet, so these effects run on Speed alone.
- A few OpenMosh sliders give more of their travel to the low end. Here every slider is linear.
- These picked effects are held back until the INDEX FX host offers what they need:

- **datamosh**: Keeps four private state buffers (frame pair, motion vectors, cut detector) and reads its own input in its last pass. INDEX FX v2 gives one history, the FX's own last output, and passes can't see the FX input after the first.
- **motion-mask**: Keeps a private background estimate apart from its output and reads its own input in its last pass, which INDEX FX v2 doesn't provide.
- **tracking**: Draws on a 2D canvas on the CPU (boxes, labels, links), not in a shader.

## License

MIT, © 2026 OpenMosh; see [LICENSE.md](LICENSE.md). Effects OpenMosh ported from X-PostProcessing-Library and Vidvox ISF-Files (both MIT) carry those notices as well. Every HTML file holds its own licenses in its first comment.
