import { Skeleton, Stack } from "@mui/material";

function Skeletons() {
    return (
        <Stack spacing={.5}>
            <Skeleton
                sx={{ borderRadius: 1 }}
                variant="rectangular"
                width={270}
                height={180} />
            <Skeleton
                variant="rectangular"
                width={70}
                height={10} />
            <Skeleton
                variant="rectangular"
                width={130}
                height={20} />
            <Skeleton
                variant="rectangular"
                width={180}
                height={7} />
            <Skeleton
                variant="rectangular"
                width={180}
                height={7} />
            <Skeleton
                sx={{ borderRadius: 1 }}
                variant="rectangular"
                width={270}
                height={40} />
        </Stack>
    )
}

export default function SkeletonComponent() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 10 }}>
            <Stack spacing={.5}>
                <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                />
            </Stack>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => <Skeletons key={index} />)}
        </div>
    )
}