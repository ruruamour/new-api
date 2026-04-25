# Git snapshot 20260426-030257

- branch: `feature/ui-redesign`
- HEAD: `ed6ff0f26`
- upstream/main: `f2f3410dc`
- local ahead / behind upstream: `0	229`

## Remotes

```text
origin	https://***@github.com/ruruamour/new-api.git (fetch)
origin	https://***@github.com/ruruamour/new-api.git (push)
upstream	https://github.com/QuantumNous/new-api.git (fetch)
upstream	https://github.com/QuantumNous/new-api.git (push)
```

## Working tree

```text
## feature/ui-redesign
 M .gitignore
 M common/constants.go
 M middleware/distributor.go
 M model/ability.go
 M model/channel_cache.go
 M model/channel_satisfy.go
 M model/pricing.go
 M model/pricing_default.go
 M model/task_cas_test.go
 M setting/ratio_setting/cache_ratio.go
 M setting/ratio_setting/model_ratio.go
 M web/bun.lock
 M web/index.html
 M web/package.json
 M web/public/logo.png
 M web/src/App.jsx
 M web/src/components/common/ui/Loading.jsx
 M web/src/components/common/ui/SelectableButtonGroup.jsx
 M web/src/components/layout/Footer.jsx
 M web/src/components/layout/headerbar/HeaderLogo.jsx
 M web/src/components/settings/personal/components/UserInfoHeader.jsx
 M web/src/components/table/model-pricing/filter/PricingVendors.jsx
 M web/src/components/table/model-pricing/layout/header/PricingVendorIntro.jsx
 M web/src/components/table/model-pricing/layout/header/PricingVendorIntroSkeleton.jsx
 M web/src/components/topup/InvitationCard.jsx
 M web/src/components/topup/RechargeCard.jsx
 M web/src/context/Theme/index.jsx
 M web/src/helpers/dashboard.jsx
 M web/src/helpers/utils.jsx
 M web/src/hooks/dashboard/useDashboardCharts.jsx
 M web/src/index.css
 M web/src/index.jsx
 M web/src/pages/Home/index.jsx
 M web/vite.config.js
?? DEVLOG.md
?? configs/
?? model/channel_alias_matching_test.go
?? new-api-dev.code-workspace
?? playbooks/
?? scripts/
?? setting/ratio_setting/model_ratio_test.go
?? web/public/epiphyllum-lineart.png
?? web/public/epiphyllum-texture.png
?? web/public/flower-line-1.png
?? web/public/flower-pattern-custom.png
?? web/public/flower-pattern-dense.png
?? web/public/flower-pattern-solid.png
?? web/public/flower-pattern.png
?? web/public/home-flower-bg.png
?? web/public/laplace-suigin-danhua.css
?? web/src/components/layout/headerbar/UIThemeSelector.jsx
?? web/src/context/UITheme/
?? web/src/pages/ThemePreview/
?? web/src/styles/
```

## Tracked diff stat

```text
 .gitignore                                         |  31 ++
 common/constants.go                                |   2 +-
 middleware/distributor.go                          |  10 +-
 model/ability.go                                   |  31 +-
 model/channel_cache.go                             |  30 +-
 model/channel_satisfy.go                           |  24 +-
 model/pricing.go                                   |  17 +-
 model/pricing_default.go                           |  24 +-
 model/task_cas_test.go                             |   8 +-
 setting/ratio_setting/cache_ratio.go               |  30 +-
 setting/ratio_setting/model_ratio.go               | 171 ++++++++-
 web/bun.lock                                       |  10 +-
 web/index.html                                     |   2 +-
 web/package.json                                   |   1 +
 web/public/logo.png                                | Bin 9597 -> 199628 bytes
 web/src/App.jsx                                    |   9 +
 web/src/components/common/ui/Loading.jsx           |   3 +-
 .../components/common/ui/SelectableButtonGroup.jsx |   6 +-
 web/src/components/layout/Footer.jsx               |   8 +-
 web/src/components/layout/headerbar/HeaderLogo.jsx |   2 +-
 .../personal/components/UserInfoHeader.jsx         |  16 +-
 .../table/model-pricing/filter/PricingVendors.jsx  |   1 +
 .../layout/header/PricingVendorIntro.jsx           |  26 +-
 .../layout/header/PricingVendorIntroSkeleton.jsx   |  30 +-
 web/src/components/topup/InvitationCard.jsx        |  16 +-
 web/src/components/topup/RechargeCard.jsx          |  16 +-
 web/src/context/Theme/index.jsx                    |   3 +-
 web/src/helpers/dashboard.jsx                      |   4 +-
 web/src/helpers/utils.jsx                          |  42 ++-
 web/src/hooks/dashboard/useDashboardCharts.jsx     |   4 +
 web/src/index.css                                  | 260 +++++++++++---
 web/src/index.jsx                                  |  36 +-
 web/src/pages/Home/index.jsx                       | 385 ++++++++-------------
 web/vite.config.js                                 |   7 +-
 34 files changed, 814 insertions(+), 451 deletions(-)
```

## Tracked changed files

```text
M	.gitignore
M	common/constants.go
M	middleware/distributor.go
M	model/ability.go
M	model/channel_cache.go
M	model/channel_satisfy.go
M	model/pricing.go
M	model/pricing_default.go
M	model/task_cas_test.go
M	setting/ratio_setting/cache_ratio.go
M	setting/ratio_setting/model_ratio.go
M	web/bun.lock
M	web/index.html
M	web/package.json
M	web/public/logo.png
M	web/src/App.jsx
M	web/src/components/common/ui/Loading.jsx
M	web/src/components/common/ui/SelectableButtonGroup.jsx
M	web/src/components/layout/Footer.jsx
M	web/src/components/layout/headerbar/HeaderLogo.jsx
M	web/src/components/settings/personal/components/UserInfoHeader.jsx
M	web/src/components/table/model-pricing/filter/PricingVendors.jsx
M	web/src/components/table/model-pricing/layout/header/PricingVendorIntro.jsx
M	web/src/components/table/model-pricing/layout/header/PricingVendorIntroSkeleton.jsx
M	web/src/components/topup/InvitationCard.jsx
M	web/src/components/topup/RechargeCard.jsx
M	web/src/context/Theme/index.jsx
M	web/src/helpers/dashboard.jsx
M	web/src/helpers/utils.jsx
M	web/src/hooks/dashboard/useDashboardCharts.jsx
M	web/src/index.css
M	web/src/index.jsx
M	web/src/pages/Home/index.jsx
M	web/vite.config.js
```

## Untracked files

```text
DEVLOG.md
configs/README.md
model/channel_alias_matching_test.go
new-api-dev.code-workspace
playbooks/change-snapshots/.gitkeep
playbooks/change-snapshots/baseline-before-upstream-20260426-0303.md
playbooks/change-tracking.md
playbooks/deploy-logs/.gitkeep
playbooks/upstream-sync-runbook.md
scripts/git-snapshot.sh
scripts/new-api-healthcheck.sh
scripts/new-api-start.sh
scripts/prune-logs.sh
scripts/upstream-status.sh
setting/ratio_setting/model_ratio_test.go
web/public/epiphyllum-lineart.png
web/public/epiphyllum-texture.png
web/public/flower-line-1.png
web/public/flower-pattern-custom.png
web/public/flower-pattern-dense.png
web/public/flower-pattern-solid.png
web/public/flower-pattern.png
web/public/home-flower-bg.png
web/public/laplace-suigin-danhua.css
web/src/components/layout/headerbar/UIThemeSelector.jsx
web/src/context/UITheme/index.jsx
web/src/pages/ThemePreview/index.jsx
web/src/styles/themes/_variables.css
web/src/styles/themes/corporate.css
web/src/styles/themes/cyberpunk.css
web/src/styles/themes/dark-pro.css
web/src/styles/themes/forest-green.css
web/src/styles/themes/glassmorphism.css
web/src/styles/themes/index.js
web/src/styles/themes/minimal-light.css
web/src/styles/themes/neumorphism.css
web/src/styles/themes/ocean-blue.css
web/src/styles/themes/royal-purple.css
web/src/styles/themes/sunset-orange.css
web/src/styles/themes/warm-cream.css
```

## Frontend diff stat

```text
 web/bun.lock                                       |  10 +-
 web/index.html                                     |   2 +-
 web/package.json                                   |   1 +
 web/public/logo.png                                | Bin 9597 -> 199628 bytes
 web/src/App.jsx                                    |   9 +
 web/src/components/common/ui/Loading.jsx           |   3 +-
 .../components/common/ui/SelectableButtonGroup.jsx |   6 +-
 web/src/components/layout/Footer.jsx               |   8 +-
 web/src/components/layout/headerbar/HeaderLogo.jsx |   2 +-
 .../personal/components/UserInfoHeader.jsx         |  16 +-
 .../table/model-pricing/filter/PricingVendors.jsx  |   1 +
 .../layout/header/PricingVendorIntro.jsx           |  26 +-
 .../layout/header/PricingVendorIntroSkeleton.jsx   |  30 +-
 web/src/components/topup/InvitationCard.jsx        |  16 +-
 web/src/components/topup/RechargeCard.jsx          |  16 +-
 web/src/context/Theme/index.jsx                    |   3 +-
 web/src/helpers/dashboard.jsx                      |   4 +-
 web/src/helpers/utils.jsx                          |  42 ++-
 web/src/hooks/dashboard/useDashboardCharts.jsx     |   4 +
 web/src/index.css                                  | 260 +++++++++++---
 web/src/index.jsx                                  |  36 +-
 web/src/pages/Home/index.jsx                       | 385 ++++++++-------------
 web/vite.config.js                                 |   7 +-
 23 files changed, 515 insertions(+), 372 deletions(-)
```

## Local tracked files also changed upstream

```text
.gitignore
common/constants.go
middleware/distributor.go
model/pricing.go
model/task_cas_test.go
setting/ratio_setting/cache_ratio.go
setting/ratio_setting/model_ratio.go
web/bun.lock
web/package.json
web/src/components/layout/Footer.jsx
web/src/components/topup/RechargeCard.jsx
web/src/helpers/dashboard.jsx
web/src/helpers/utils.jsx
web/src/hooks/dashboard/useDashboardCharts.jsx
web/src/index.css
```
