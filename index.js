import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import got from 'got'
import { configFields } from './config.js'
import { upgradeScripts } from './upgrade.js'
import { FIELDS } from './fields.js'
import { createPresets } from './presets.js'

class JetbrainsIdeInstance extends InstanceBase {
	async configUpdated(config) {
		this.config = config

		this.initActions()
		this.setPresetDefinitions(createPresets())
	}

	async init(config, _) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.initActions()
		this.setPresetDefinitions(createPresets())
	}

	// Return config fields for web config
	getConfigFields() {
		return configFields
	}

	// When module gets deleted
	async destroy() {
	}

	async execute(action, runConfig) {
		let url = `http://${this.config.host}:${this.config.port}/api/action/${action}`

		if (runConfig) {
			url += `?name=${encodeURIComponent(runConfig)}`
		}

		const password = this.config.password
		const options = password ? {
			headers: {
				Authorization: `${password}`,
			}
		} : {}

		try {
			await got.get(url, options)
		} catch (e) {
			this.log('error', `HTTP GET Request failed (${e.message})`)
			this.updateStatus(InstanceStatus.UnknownError, e.code)
		}
	}

	initActions() {
		this.setActionDefinitions({
			runWithConfig: {
				name: 'Run Action with Configuration',
				options: [
					FIELDS.Action,
					FIELDS.RunConfiguration,
				],
				callback: async (action, context) => {
					const jbAction = await context.parseVariablesInString(action.options.action)
					const runConfiguration = await context.parseVariablesInString(action.options.runConfiguration)

					await this.execute(jbAction, runConfiguration)
				},
			},
			runWithoutConfig: {
				name: 'Run Action',
				options: [
					FIELDS.Action,
				],
				callback: async (action, context) => {
					const jbAction = await context.parseVariablesInString(action.options.action)
					await this.execute(jbAction)
				},
			}
		})
	}
}

runEntrypoint(JetbrainsIdeInstance, upgradeScripts)
