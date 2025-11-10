import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Box, IconButton, Paper, SvgIconProps } from "@mui/material";
import { useRouter } from "next/navigation";

const DashboardCard = (props: {
  icon: React.ElementType<SvgIconProps>;
  title: string;
  subtitle: string;
  latestInfo: string;
  route: string;
}) => {
  const { title, subtitle, latestInfo, route } = props;
  const IconCard = props.icon;
  const router = useRouter();
  return (
    <Paper
      elevation={8}
      onClick={() => {
        router.push(`/${route}`);
      }}
      sx={{
        borderRadius: "15px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 10,
        },
      }}
      className="flex flex-col h-64 p-10 gap-2"
    >
      <IconCard
        sx={{
          color: "#2196F3",
          fontSize: 40,
          marginBottom: 2,
        }}
      />
      <Box className="flex flex-col gap-2">
        <h5 className="font-bold text-xl">{title}</h5>
        <p className="text-base text-[#9E9E9E]">{subtitle}</p>
      </Box>
      <Box className="flex justify-between items-center">
        <p className="text-sm text-blue-400">{latestInfo}</p>
        <IconButton
          aria-label="details"
          sx={{ color: "#81D4FA" }}
          onClick={() => {
            router.push(`/${route}`);
          }}
        >
          {<ArrowCircleRightOutlinedIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export { DashboardCard };
