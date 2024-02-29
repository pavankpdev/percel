# Percel - Another Vercel clone
### But better

I've been building this to upskill in a lot of areas, so feel free to play around and open issues if you'd like to suggest anything. 

> Note
> 
> I know that the folder structures aren't good, because, the goal of this project is just upskilling, not about organizing. 
> Regardless, I'm following best practices. 


## here's the entire plan
- [x] Code builder docker image
- [x] ECS to run the builder on demand with Fargate
- [x] API endpoints to automate it
- [x] Upload directories inside `dist` instead of just files. 
- [x] Stream logs from the build time
- [ ] Stream logs to ELK stack or some other tool
- [ ] Handle custom domain by checking the DB and proxy to the custom domain
- [ ] Add support to Serverless functions
- [ ] Support edge deployments with AWS infra
- [ ] Support middleware with cloudflare
- [ ] Setup CICD from source control 
