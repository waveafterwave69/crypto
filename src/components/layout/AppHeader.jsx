import { Layout, Select, Space, Button } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
const { Header } = Layout

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const options = [
    {
        label: 'China',
        value: 'china',
        emoji: '🇨🇳',
        desc: 'China (中国)',
    },
    {
        label: 'USA',
        value: 'usa',
        emoji: '🇺🇸',
        desc: 'USA (美国)',
    },
    {
        label: 'Japan',
        value: 'japan',
        emoji: '🇯🇵',
        desc: 'Japan (日本)',
    },
    {
        label: 'Korea',
        value: 'korea',
        emoji: '🇰🇷',
        desc: 'Korea (韩国)',
    },
]

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const { crypto } = useCrypto()

    useEffect(() => {
        function keypress(e) {
            if (e.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(value) {
        console.log(value)
    }

    return (
        <>
            <Header style={headerStyle}>
                <Select
                    onSelect={handleSelect}
                    onClick={() => setSelect((prev) => !prev)}
                    style={{ width: '250px' }}
                    value="press / to open"
                    open={select}
                    options={crypto.map((coin) => ({
                        label: coin.name,
                        value: coin.id,
                        icon: coin.icon,
                    }))}
                    optionRender={(option) => (
                        <Space>
                            <img
                                style={{ width: '20px' }}
                                src={option.data.icon}
                                alt={option.data.label}
                            />{' '}
                            {option.data.label}
                        </Space>
                    )}
                />
                <Button type="primary">Add Asset</Button>
            </Header>
        </>
    )
}
