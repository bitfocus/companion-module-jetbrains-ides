import {combineRgb} from "@companion-module/base";

const actionPresets = [
    {
        category: 'Run/Debug',
        name: 'Run',
        actionId: 'runWithConfig',
        jbAction: 'Run',
    },
    {
        category: 'Run/Debug',
        name: 'Debug',
        actionId: 'runWithConfig',
        jbAction: 'Debug',
    },
    {
        category: 'Run/Debug',
        name: 'Stop',
        actionId: 'runWithConfig',
        jbAction: 'Stop',
    },
    {
        category: 'Run/Debug',
        name: 'Pause',
        actionId: 'runWithoutConfig',
        jbAction: 'Pause',
    },
    {
        category: 'Run/Debug',
        name: 'Resume',
        actionId: 'runWithoutConfig',
        jbAction: 'Resume',
    },
    {
        category: 'Run/Debug',
        name: 'Step Into',
        actionId: 'runWithoutConfig',
        jbAction: 'StepInto',
    },
    {
        category: 'Run/Debug',
        name: 'Step Over',
        actionId: 'runWithoutConfig',
        jbAction: 'StepOver',
    },
    {
        category: 'Run/Debug',
        name: 'Step Out',
        actionId: 'runWithoutConfig',
        jbAction: 'StepOut',
    },

    {
        category: 'VCS',
        name: 'Pull',
        actionId: 'runWithoutConfig',
        jbAction: 'Vcs.UpdateProject',
    },
    {
        category: 'VCS',
        name: 'Push',
        actionId: 'runWithoutConfig',
        jbAction: 'Vcs.Push',
    },
    {
        category: 'VCS',
        name: 'Commit',
        actionId: 'runWithoutConfig',
        jbAction: 'CheckinProject',
    },

    {
        category: 'Project',
        name: 'New Project',
        actionId: 'runWithoutConfig',
        jbAction: 'NewProject',
    },
    {
        category: 'Project',
        name: 'Open',
        actionId: 'runWithoutConfig',
        jbAction: 'Open',
    },
    {
        category: 'Project',
        name: 'Close Project',
        actionId: 'runWithoutConfig',
        jbAction: 'CloseProject',
    },
    {
        category: 'Project',
        name: 'Project Structure',
        actionId: 'runWithoutConfig',
        jbAction: 'ShowProjectStructureSettings',
    },
    {
        category: 'Project',
        name: 'Search Everywhere',
        actionId: 'runWithoutConfig',
        jbAction: 'SearchEverywhere',
    },
    {
        category: 'Project',
        name: 'Reload Project',
        actionId: 'runWithoutConfig',
        jbAction: 'ExternalSystem.RefreshAllProjects',
    }
]

export function createPresets() {
    const presets = {}

    for (const preset of actionPresets) {
        presets[preset.jbAction.replace('.', '_')] = {
            type: 'button',
            category: preset.category,
            name: preset.name,
            style: {
                text: preset.name,
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: preset.actionId,
                            options: {
                                action: preset.jbAction,
                            }
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        }
    }

    presets['Build'] = {
        type: 'button',
        category: 'Project',
        name: 'Build',
        style: {
            text: 'Build',
            size: 'auto',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'runWithConfig',
                        options: {
                            action: 'Build',
                        }
                    },
                    { // IDEA calls its build action CompileDirty, unlike other JetBrains IDEs from what I can tell
                        actionId: 'runWithoutConfig',
                        options: {
                            action: 'CompileDirty',
                        }
                    }
                ],
                up: []
            }
        ],
        feedbacks: []
    }

    return presets
}
