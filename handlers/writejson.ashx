<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.IO;


public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {


        context.Response.Write(context.Request["tags"]);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}