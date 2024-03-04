type fetcherType={
  url:string,
  method:string,
  body:object,
  json?:boolean

}
export const fetcher = async ({ url, method, body, json = true }:fetcherType ) => {
  
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("API Error")
  }

  if (json) {
    const data = await res.json()
    return data.data;
  }
};

type fetching = ReturnType<typeof fetcher>


export const register = async (user:object) => {
  return fetcher({ url: "/api/register", method: "POST", body: user});
};

export const signin = async (user:object) => {
  return fetcher({ url: "/api/signin", method: "POST", body: user});
};

export const createNewTask = (task:any) => {
  return fetcher({
    url:"/api/task",
    method:"POST",
    body:{
      task: {
        // Include other properties like projectId, description, due, etc.
        name: task?.name,
        projectId: task?.projectId,
        description: task?.description,
        due: task?.due,
      },
    },
    json: true,
  });

};

export const createNewProject =(name:any)=>{
  return fetcher({ url: "/api/project", method: "POST", body:{name}, json: true})
}

export const updateTaskStatus =({taskId, status}:any)=>{
  return fetcher({url:"/api/updateStatus", method:"PUT", body:{taskId, status}, json:true})
}