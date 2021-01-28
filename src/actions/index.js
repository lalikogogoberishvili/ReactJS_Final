export const increment=(number)=>{
  return {
      type:"INCREMENT",
      payLoad:number
  }
}

export const decrement=()=>{
  return {
      type:"DECREMENT"
  }
}