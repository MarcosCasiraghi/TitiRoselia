import { Box } from "@mantine/core";


function InfiniteSlide() {

    return (
        <Box
            style={{
                backgroundColor: "#201b5b",
                color: "#f1f0ec",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                height: "100px",
                width: "100%",
                position: "relative",
                margin: "1rem 0 1rem 0"
            }}
        >
            <div style={{ display: "flex", gap: "150px", animation: "scrollText 1000s linear infinite" }}>
                {[...Array(100)].map((_, i) => (
                    <span key={i} style={{ fontSize: "24px" }}>
                        Titi Roselia
                    </span>
                ))}
            </div>
            <style>
                {`@keyframes scrollText {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                    }
                `}
            </style>
        </Box>
    )
}

export default InfiniteSlide;