# Home placeholder videos

These files are temporary development assets for the multi-clip Home experience.
They must be replaced before the production launch.

## Files

| Website asset | Temporary source from `D:\Personal\img\action4` | Duration | Output size |
| --- | --- | ---: | ---: |
| `home-01.mp4` | `DJI_20260227102700_0040_D.MP4` | 11.13 s | 9.55 MB |
| `home-02.mp4` | `DJI_20260227104613_0052_D.MP4` | 24.43 s | 22.14 MB |
| `home-03.mp4` | `DJI_20260227142756_0084_D.MP4` | 14.30 s | 14.40 MB |
| `home-04.mp4` | `DJI_20260227144204_0094_D.MP4` | 19.43 s | 18.84 MB |

Each MP4 has a matching `home-0N-poster.webp` image extracted near the beginning
of the compressed video.

## Selection and encoding

- Randomly selected from video files between 20 MB and 600 MB so temporary
  processing and repository size stay practical.
- Source files were not modified.
- Output: H.264 MP4, 1920x1080, 30 fps, `yuv420p`, no audio.
- Encoding: CRF 25, `medium` preset, `faststart` enabled.
- Posters: WebP, 1920x1080, quality 82, sampled at approximately 0.2 seconds.

## Replacement contract

The simplest replacement is to keep the generic filenames. Replace both the MP4
and matching poster for a slot. Production assets should remain browser-compatible,
include `faststart`, and be tested on desktop and mobile before deployment.

