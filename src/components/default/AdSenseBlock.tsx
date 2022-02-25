type Props = {
    slot: string,
    format: string,
    width: string,
    height: string
}

export default function AdSenseBlock({ slot, format, width, height }: Props) {
    return (
        <div style={{ width, height }}>
            <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-1539700405631954"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
        </div>
    )
}
