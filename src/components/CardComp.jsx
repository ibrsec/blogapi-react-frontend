import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions"; 
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors"; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function CardComp({ title, content, _id, username, category,createdAt }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
      <Card sx={{ maxWidth: 345, height:280, padding:".5rem",display:'flex',flexDirection:"column",justifyContent:"space-between",gap:"1rem" }}>
        <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username[0]?.toUpperCase()}
            </Avatar>
          }
          title={username}
          subheader={new Date(createdAt).toLocaleString('tr-TR')}
          // subheader="September 14, 2016"
        />
        <CardContent  >
          <Typography fontWeight={500} sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
   }}>{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
   }}>
            {content}
          </Typography>
        </CardContent>
        </Box>
        <CardActions disableSpacing sx={{display:'flex',alignItems:"center",justifyContent:"space-between",gap:"1rem"}}>
          <Typography variant="body2" color="text.secondary" >Category:{category}</Typography>
          <Link to={"/"+_id}>
          <Button variant="contained" >

            More
            <ChevronRightIcon />
          </Button></Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
