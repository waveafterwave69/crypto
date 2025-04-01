import { createContext, useContext, useEffect, useState } from 'react'
import { fakeFetchCrypto, fakeFetchAssets } from '../helpers/api.js'
import { percentDiff } from '../helpers/utils.js'

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fakeFetchAssets()

            setAssets(
                assets.map((asset) => {
                    const coin = result.find((c) => {
                        return c.id === asset.id
                    })
                    return {
                        grow: asset.price < coin.price,
                        growPercent: percentDiff(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit:
                            asset.amount * coin.price -
                            asset.amount * asset.price,
                        ...asset,
                    }
                })
            )
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets }}>
            {children}
        </CryptoContext.Provider>
    )
}

export function useCrypto() {
    return useContext(CryptoContext)
}
