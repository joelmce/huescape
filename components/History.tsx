interface Props {
    gradient?: {
        backgroundImage: string,
        backgroundColor: string
    }
}

export default function History({gradient}: Props) {
    return <div className="w-16 h-16 rounded" style={gradient}></div>
}