let moviedata;
let canvas=d3.select("#canvas")
let legend=d3.select("#legend")
const tooltip=d3.select("#tooltip")
let drawmap=()=>{
    let hierarchy=d3.hierarchy(moviedata,(node)=>{
        return node.children
    }).sum((node)=>{
        return node.value
    })
    .sort((node1,node2)=>{
        return node2.value-node1.value
    })
    
    let createmap=d3.treemap()
                    .size([1000,600]);
    createmap(hierarchy)
    console.log(hierarchy.leaves())
    const block=canvas.selectAll("g")
                    .data(hierarchy.leaves())
                    .enter()
                    .append("g")
                    .attr("transform",(movie)=>{
                        return `translate(${movie.x0},${movie.y0})`
                    })
    block.append("rect")
        .attr("class","tile")
        .attr("fill",(movie)=>{
            const category=movie.data.category
            console.log(category)
            if(category==="Action")
            return "#4C92C3"
            else if(category==="Adventure")
            return "#BED2ED"
            else if(category==="Comedy")
            return "#FF993E"
            else if(category==="Drama")
            return "#FFC993"
            else if(category==="Animation")
            return "#56B356"
            else if(category==="Family")
            return "#ADE5A1"
            else if(category==="Biography")
            return "#DE5253"
            
        })
        .attr("data-name",(movie)=>movie.data.name)
        .attr("data-category",(movie)=>movie.data.category)
        .attr("data-value",(movie)=>movie.data.value)
        .attr("width",(movie)=>{
            return (movie.x1-movie.x0)
        })
        .attr("height",(movie)=>{
            return (movie.y1-movie.y0)
        })
        .on("mouseover",(event,item)=>{
            const x=event.clientX;
            const y=event.clientY;
            tooltip.style("visibility","visible")
                    .style("top",(y+10)+"px")
                    .style("left",(x+10)+"px")
                    .attr("data-value",item.data.value)
            tooltip.html(`Name:${item.data.name}<br>Category:${item.data.category}<br>Value:${item.data.value}`)
        })
        .on("mouseout",(event,item)=>{
            
            tooltip.style("visibility","hidden")
        })
        block.append("text")
              .text((movie)=>movie.data.name)
              .attr('x',5)
              .attr("y",20)  
        const legendata=["Action","Adventure","Comedy","Drama","Animation","Family","Biography"]
        const mylegend=legend.selectAll('g')
                              .data(legendata)
                              .enter()
                              .append("g")
                              .attr("x",(d,i)=>50+i*120)
                              .attr("y",(d,i)=>30+i);
        mylegend.append("rect")
                .attr("height",20)
                .attr("width",20)
                .attr("x",(d,i)=>40+i*120)
                .attr("y",(d,i)=>20)
                .attr("class","legend-item")
                .attr("fill",(category)=>{
                    if(category==="Action")
                    return "#4C92C3"
                    else if(category==="Adventure")
                    return "#BED2ED"
                    else if(category==="Comedy")
                    return "#FF993E"
                    else if(category==="Drama")
                    return "#FFC993"
                    else if(category==="Animation")
                    return "#56B356"
                    else if(category==="Family")
                    return "#ADE5A1"
                    else if(category==="Biography")
                    return "#DE5253"
                    
                })
        mylegend.append("text")
                .text((d)=>(d))
                .attr("x",(d,i)=>70+i*120)
                .attr("y",(d,i)=>30+i);
               
    }
d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json")
    .then((data,error)=>{
        if(error)
        console.log(error)
        else{
            moviedata=data;
            //console.log(moviedata);
            drawmap()
        }
    })