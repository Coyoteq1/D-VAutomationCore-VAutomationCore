# Local Repository Mapping Report (No Metadata Changes Applied)

This report defines an organized split of projects into separate repositories.

Scope: informational/local planning only. Existing manifests, project files, and remotes are intentionally left unchanged.

## Requested Target Repositories

| Project | Target Repository |
|---|---|
| VAutomationCore | https://github.com/Coyoteq1/VAutomationCore |
| BlueLock | https://github.com/Bluelock/Bluelock |
| VAutoTraps | https://github.com/Coyoteq1/Vauto-Private-Mods |
| lifecycle (CycleBorn) | https://github.com/Coyoteq1/Vauto-Private-Mods |
| VAutoannounce | https://github.com/Coyoteq1/Vauto-Private-Mods |

## Current Observed Mapping (workspace metadata)

| Project | Current URL in metadata |
|---|---|
| VAutomationCore | https://github.com/Coyoteq1/VAutomationCore |
| BlueLock | https://github.com/Bluelock/Bluelock |
| VAutoTraps | https://github.com/Coyoteq1/Vauto-Private-Mods |
| lifecycle (CycleBorn) | https://github.com/Coyoteq1/Vauto-Private-Mods |
| VAutoannounce | https://github.com/Coyoteq1/Vauto-Private-Mods |

## Proposed Organized Repo Map (remaining projects)

| Project | Proposed Repository | Notes |
|---|---|---|
| VAutomationCore | https://github.com/Coyoteq1/VAutomationCore | Primary shared core package |
| lifecycle (CycleBorn) | https://github.com/Coyoteq1/Cycleborn | Player lifecycle module |
| Swapkits | https://github.com/Coyoteq1/Swapkits | Kit swapping/loadout plugin |

## Explicit Additions Requested

The following local folders are now explicitly mapped in this report:

| Local Folder | Proposed Repository |
|---|---|
| `Swapkits` | https://github.com/Coyoteq1/Swapkits |
| `VAutoannounce` | https://github.com/Coyoteq1/Vauto-Private-Mods |
| `CycleBorn` | https://github.com/Coyoteq1/Vauto-Private-Mods |

## Organization Rules (recommended)

1. One plugin/package per repository.
2. Keep package ID / manifest `name` stable inside each repo.
3. Place publish workflow in each repo at `.github/workflows/publish-nuget.yml` (NuGet) and/or mod-pack release workflow.
4. Keep root README focused on that repo's plugin only.
5. Track shared code through package dependency (`VAutomationCore`) instead of copy-paste.

## Local-Only Outcome

- No existing repository metadata was modified.
- No Git remote URLs were changed.
- This file is a planning report only.

