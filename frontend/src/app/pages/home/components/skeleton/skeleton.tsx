import { Skeleton, Stack } from "@mui/material";

export default function SkeletonComponent() {
    return (
        <Stack spacing={.5}>
            <Skeleton
                sx={{ borderRadius: 1 }}
                variant="rectangular"
                width={'100%'}
                height={120} />
            <Skeleton
                variant="rectangular"
                width={40}
                height={10} />
            <Skeleton
                variant="rectangular"
                width={70}
                height={20} />
            <Skeleton
                variant="rectangular"
                width={160}
                height={7} />
            <Skeleton
                variant="rectangular"
                width={160}
                height={7} />
            <Skeleton
                sx={{ borderRadius: 1 }}
                variant="rectangular"
                width={'100%'}
                height={40} />
        </Stack>
    )
}