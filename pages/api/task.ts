import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";


export default async function handler (req,res){
  // if (req.method === 'POST') {
    const { name, projectId, description, due } = req.body.task;
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
    
    // const project = await db.project.findUnique({
    //   where: {
    //     id: req.body?.projectId, 
    //   },
    // })

    // if (!project) {
    //   return res.status(404).json({ error: "Project not found" });
    // }

  await db.task.create({
        data:({
          ownerId: user.id, // Assuming you have the user object
          projectId: projectId,
          description: description,
          due: due,
          name: name,
     
          owner: {
            connect: { id: user.id },
          },
          project: {
            connect: { id: projectId },
          },
        }),
      });
    res.json({ data: { message: 'ok' } });
  // }

}