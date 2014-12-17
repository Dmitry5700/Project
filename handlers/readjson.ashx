<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.IO;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        //File.ReadAllText
            
        
        StreamReader sr = new StreamReader("F:\\web\\Course\\test2.json");

        string res = "";

        while (!sr.EndOfStream) 
        {
            res += sr.ReadLine(); 
        }

      
        context.Response.ContentType = "text/plain";
        context.Response.Write(res);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}