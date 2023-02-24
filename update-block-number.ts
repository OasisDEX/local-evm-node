import fetch from 'node-fetch'
import { existsSync, writeFileSync, readFileSync } from 'fs';
import process from "process";

const mainnetInfoUrl = 'https://blockexplorer.one/ajax/eth/mainnet/info'
const envFile = `${process.cwd()}/.env`
const newLine = '\n'
const blockNumberOffset = -10

const updateNumber = async () => {
    const response = await fetch(mainnetInfoUrl)
    const { height }: { height: number } = await response.json()
    if (!height) {
        console.error('❌ Block height not found')
        return
    } else {
        console.log('😊 Found block height:', height)
    }

    process.env.BLOCK_NUMBER = `${height + blockNumberOffset}`

    console.log(
        '🙌 Updated the block number with',
        height + blockNumberOffset,
        `(latest block minus ${blockNumberOffset})`,
    )

    if (!existsSync(envFile)) {
        console.log(`✨ Creating .env file at ${envFile}`)
        writeFileSync(envFile, '', { flag: 'w' })
    }


    const envFileContents = readFileSync(envFile, 'utf8')
    const envFileContentLines = envFileContents
        .split(newLine)
        .filter((line: string) => !line.startsWith('BLOCK_NUMBER'))
    envFileContentLines.push(`BLOCK_NUMBER=${height + blockNumberOffset}`)

    writeFileSync(envFile, envFileContentLines.join(newLine))


    try {
        writeFileSync(envFile, envFileContentLines.join(newLine))

        console.log(
            '🙌 Updated the block number with',
            height + blockNumberOffset,
            `(latest block minus ${blockNumberOffset})`,
        )

    } catch (error) {
        console.error(`❌ Could not update the block number (${error})`)
    }
    console.log('')
}
updateNumber()
